import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserRepository } from './repos/user.repo';
import { TaskRepository } from './repos/task.repo';
import { AdminSeeder } from './seeders/admin.seeder';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ConfigModule],
  providers: [PrismaService, UserRepository, TaskRepository, AdminSeeder],
  exports: [UserRepository, TaskRepository, AdminSeeder],
})
export class DatabaseModule {}
