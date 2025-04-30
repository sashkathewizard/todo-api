import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../security/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponse } from './response/user.response';
import { RegisterDto } from './dto/register.dto';
import { UserEntity } from 'src/database/entities/user.entity';
import { CurrentUser } from 'src/security/decorators/current-user.decorator';
import { Role } from 'src/utils/enums/role.enum';
import { Roles } from 'src/security/decorators/roles.decorator';
import { RolesGuard } from 'src/security/guards/roles.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  @ApiOperation({ summary: 'User authentication' })
  @ApiResponse({
    status: 200,
    description: 'Successful authentication',
    schema: {
      properties: {
        access_token: { type: 'string' },
        refresh_token: { type: 'string' },
      },
    },
  })
  async login(@Body() loginDto: { email: string; password: string }) {
    return await this.usersService.login(loginDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: UserResponse,
  })
  async register(@Body() createUserDto: RegisterDto) {
    return this.usersService.register(createUserDto);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({
    status: 200,
    description: 'Token successfully refreshed',
    schema: {
      properties: {
        access_token: { type: 'string' },
        refresh_token: { type: 'string' },
      },
    },
  })
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.usersService.refresh(refreshToken);
  }

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new user. route for ADMIN' })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    type: UserResponse,
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users. route for ADMIN' })
  @ApiResponse({
    status: 200,
    description: 'List of users',
    type: [UserResponse],
  })
  async findAll(): Promise<UserResponse[]> {
    return this.usersService.findAll();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by ID. route for ADMIN' })
  @ApiResponse({ status: 200, description: 'User found', type: UserResponse })
  async findMe(@CurrentUser() user: UserEntity): Promise<UserResponse> {
    return this.usersService.findOne(user.id);
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by ID. route for ADMIN' })
  @ApiResponse({ status: 200, description: 'User found', type: UserResponse })
  async findOne(@Param('id') id: string): Promise<UserResponse> {
    return this.usersService.findOne(id);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully updated',
    type: UserResponse,
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() user: UserEntity,
  ): Promise<UserResponse> {
    return this.usersService.update(user.id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user by id. route for ADMIN' })
  @ApiResponse({ status: 200, description: 'User successfully deleted' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
