import { Global, Module } from '@nestjs/common';
import { UserRepository } from './repos/user.repository';
import { TaskRepository } from './repos/task.repository';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService, UserRepository, TaskRepository],
  exports: [UserRepository, TaskRepository],
})
export class DatabaseModule {}
