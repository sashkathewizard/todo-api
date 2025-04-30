import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';
import { Status } from 'src/utils/enums/status.enum';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({
    example: 'Do homework',
    description: 'Task title',
    required: false,
  })
  @IsString()
  @MinLength(3)
  @IsOptional()
  title?: string;

  @ApiProperty({
    example: 'Complete all exercises from the book',
    description: 'Task description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: '2025-01-01',
    description: 'Task due date',
    required: false,
  })
  @IsOptional()
  status?: Status;
}
