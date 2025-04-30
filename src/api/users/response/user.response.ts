import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/utils/enums/role.enum';

export class UserResponse {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'User ID',
  })
  id: string;

  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  email: string;

  @ApiProperty({ example: 'John Doe', description: 'User name' })
  name: string;

  @ApiProperty({ enum: Role, example: Role.USER, description: 'User role' })
  role: string;

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
