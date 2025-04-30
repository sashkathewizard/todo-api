import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from 'src/database/repos/task.repo';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from 'src/database/entities/task.entity';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async create(
    createTaskDto: CreateTaskDto,
    userId: string,
  ): Promise<TaskEntity> {
    return await this.taskRepository.create({ ...createTaskDto, userId });
  }

  async findMany(userId: string, where?): Promise<TaskEntity[]> {
    return await this.taskRepository.findMany({ userId, ...where });
  }

  async findOne(id: string): Promise<TaskEntity> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return await this.taskRepository.update(id, updateTaskDto);
  }

  async remove(id: string): Promise<void> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    await this.taskRepository.remove(id);
  }
}
