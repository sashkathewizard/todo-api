import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { userWithoutPasswordSelect } from 'src/utils/database/user-without-password-select.fields';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(userData: Prisma.UserCreateInput): Promise<UserEntity> {
    return this.prisma.user.create({
      data: {
        ...userData,
      },
    });
  }

  async findOneBy(where: Prisma.UserWhereInput): Promise<UserEntity | null> {
    return this.prisma.user.findFirst({
      where,
    });
  }

  async findOneById(id: string): Promise<UserEntity | null> {
    return this.prisma.user.findFirst({
      where: { id },
      select: userWithoutPasswordSelect,
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.prisma.user.findMany({ select: userWithoutPasswordSelect });
  }

  async update(
    id: string,
    userData: { email?: string; password?: string; name?: string },
  ): Promise<UserEntity> {
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }
    return this.prisma.user.update({
      where: { id },
      data: userData,
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
