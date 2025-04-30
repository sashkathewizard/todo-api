import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from '../database/repos/task.repository';
import { TaskEntity } from '../database/entities/task.entity';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async create(userId: number, taskData: TaskEntity) {
    return this.taskRepository.create(userId, taskData);
  }

  async findAll(userId: number, status?: string) {
    return this.taskRepository.findAll(userId, status as any);
  }

  async findOne(id: number, userId: number) {
    const task = await this.taskRepository.findOne(id, userId);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async update(id: number, userId: number, taskData: Partial<TaskEntity>) {
    const task = await this.taskRepository.findOne(id, userId);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return this.taskRepository.update(id, userId, taskData);
  }

  async delete(id: number, userId: number) {
    const task = await this.taskRepository.findOne(id, userId);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return this.taskRepository.delete(id, userId);
  }
} 