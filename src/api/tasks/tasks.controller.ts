import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/security/guards/jwt-auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskResponse } from './response/task.response';
import { UserEntity } from 'src/database/entities/user.entity';
import { CurrentUser } from 'src/security/decorators/current-user.decorator';
import { Status } from 'src/utils/enums/status.enum';

@ApiTags('tasks')
@ApiBearerAuth()
@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: 201,
    description: 'Task successfully created',
    type: TaskResponse,
  })
  async create(
    @CurrentUser() user: UserEntity,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskResponse> {
    console.log(user);
    return this.tasksService.create(createTaskDto, user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get task by ID' })
  @ApiResponse({
    status: 200,
    description: 'Task found',
    type: TaskResponse,
  })
  async findOne(@Param('id') id: string): Promise<TaskResponse> {
    return this.tasksService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get tasks with filters and sorting' })
  @ApiResponse({
    status: 200,
    description: 'Filtered and sorted list of tasks',
    type: [TaskResponse],
  })
  async findMany(
    @CurrentUser() user: UserEntity,
    @Query('status') status: string,
  ) {
    if (status && !Object.values(Status).includes(status as Status)) {
      throw new HttpException(
        `Invalid status value: ${status}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.tasksService.findMany(user.id, { status: status as Status });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update task' })
  @ApiResponse({
    status: 200,
    description: 'Task successfully updated',
    type: TaskResponse,
  })
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponse> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete task' })
  @ApiResponse({
    status: 200,
    description: 'Task successfully deleted',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.tasksService.remove(id);
  }
}
