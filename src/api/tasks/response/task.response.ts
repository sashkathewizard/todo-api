import { ApiProperty } from '@nestjs/swagger';
import { Status } from 'src/utils/enums/status.enum';
import { UserResponse } from 'src/api/users/response/user.response';

export class TaskResponse {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Task ID',
  })
  id: string;

  @ApiProperty({ example: 'Do homework', description: 'Task title' })
  title: string;

  @ApiProperty({
    example: 'Complete all exercises from the book',
    description: 'Task description',
    required: false,
  })
  description?: string;

  @ApiProperty({
    enum: Status,
    example: Status.NEW,
    description: 'Task status',
  })
  status: string;

  @ApiProperty({ type: UserResponse, description: 'User who owns the task' })
  user?: UserResponse;

  @ApiProperty({
    example: '2024-04-30T12:00:00.000Z',
    description: 'Creation date',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-04-30T12:00:00.000Z',
    description: 'Update date',
  })
  updatedAt: Date;
}
