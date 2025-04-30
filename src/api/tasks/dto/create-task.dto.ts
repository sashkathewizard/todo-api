import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Do homework',
    description: 'Task title',
  })
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty({
    example: 'Complete all exercises from the book',
    description: 'Task description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
