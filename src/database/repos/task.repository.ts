import { Injectable } from '@nestjs/common';
import { TaskEntity } from '../entities/task.entity';
import { Status } from 'src/utils/enums/status.enum';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, taskData: TaskEntity) {
    return this.prisma.task.create({
      data: {
        ...taskData,
        userId,
      },
    });
  }

  async findAll(userId: number, status?: Status) {
    return this.prisma.task.findMany({
      where: {
        userId,
        ...(status && { status }),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number, userId: number) {
    return this.prisma.task.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  async update(id: number, userId: number, taskData: Partial<TaskEntity>) {
    return this.prisma.task.update({
      where: {
        id,
        userId,
      },
      data: taskData,
    });
  }

  async delete(id: number, userId: number) {
    return this.prisma.task.delete({
      where: {
        id,
        userId,
      },
    });
  }
}
