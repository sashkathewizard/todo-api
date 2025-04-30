import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserEntity } from 'src/database/entities/user.entity';
import { Role } from 'src/utils/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const roles: Role[] = this.reflector.get<Role[]>(
      'roles',
      context.getHandler(),
    );
    const user: UserEntity = request.user;

    console.log(user);

    if (!roles || roles.length === 0) return true;

    if (roles.includes(user.role as Role)) return true;

    throw new ForbiddenException(
      'User has no permission to perform this action',
    );
  }
}
