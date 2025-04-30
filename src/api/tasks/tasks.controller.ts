import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskEntity } from '../database/entities/task.entity';
import { JwtAuthGuard } from '../users/guards/jwt-auth.guard';
import { User } from '../users/decorators/user.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Task successfully created' })
  create(@Body() taskData: TaskEntity, @User() user: any) {
    return this.tasksService.create(user.id, taskData);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'Return all tasks' })
  findAll(@User() user: any, @Query('status') status?: string) {
    return this.tasksService.findAll(user.id, status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get task by id' })
  @ApiResponse({ status: 200, description: 'Return task by id' })
  findOne(@Param('id') id: string, @User() user: any) {
    return this.tasksService.findOne(+id, user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update task' })
  @ApiResponse({ status: 200, description: 'Task successfully updated' })
  update(@Param('id') id: string, @Body() taskData: Partial<TaskEntity>, @User() user: any) {
    return this.tasksService.update(+id, user.id, taskData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete task' })
  @ApiResponse({ status: 200, description: 'Task successfully deleted' })
  remove(@Param('id') id: string, @User() user: any) {
    return this.tasksService.delete(+id, user.id);
  }
} 