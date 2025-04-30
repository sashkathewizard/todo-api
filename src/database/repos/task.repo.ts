import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { TaskEntity } from '../entities/task.entity';
import { Status } from 'src/utils/enums/status.enum';

@Injectable()
export class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(taskData: Prisma.TaskUncheckedCreateInput): Promise<TaskEntity> {
    return this.prisma.task.create({
      data: taskData,
      include: {
        user: true,
      },
    });
  }

  async findById(id: string): Promise<TaskEntity | null> {
    return this.prisma.task.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  async findMany(where: Prisma.TaskWhereInput): Promise<TaskEntity[]> {
    return this.prisma.task.findMany({
      where,
      include: {
        user: true,
      },
    });
  }

  async update(
    id: string,
    taskData: { title?: string; description?: string; status?: Status },
  ): Promise<TaskEntity> {
    return this.prisma.task.update({
      where: { id },
      data: taskData,
      include: {
        user: true,
      },
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.task.delete({
      where: { id },
    });
  }
}
