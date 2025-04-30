import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: '1', description: 'User ID' })
  id: string;

  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  email: string;

  @ApiProperty({ example: 'John Doe', description: 'User name' })
  name: string;

  @ApiProperty({
    example: '2024-03-20T12:00:00Z',
    description: 'User creation date',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-03-20T12:00:00Z',
    description: 'User last update date',
  })
  updatedAt: Date;
}
