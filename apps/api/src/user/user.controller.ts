import { Controller, Get, Param, Logger, Delete, Put, Body, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Users')
@Controller('user')
export class UserController {
  private readonly logger;

  constructor(private readonly userService: UserService) {
    this.logger = new Logger(UserController.name);
  }

  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Returns the user' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    this.logger.debug(`Getting user by id: ${id}`);
    return this.userService.getUserById(id);
  }

  @ApiOperation({ summary: 'Get user by Supabase ID' })
  @ApiParam({ name: 'supabaseId', description: 'Supabase User ID' })
  @ApiResponse({ status: 200, description: 'Returns the user with related data' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get('supabase/:supabaseId')
  async getUserBySupabaseId(@Param('supabaseId') supabaseId: string) {
    this.logger.debug(`Getting user by supabase id: ${supabaseId}`);
    return this.userService.getUserBySupabaseId(supabaseId);
  }

  @ApiOperation({ summary: 'Create new user' })
  @ApiBody({ type: CreateUserDto, description: 'User data' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid user data' })
  @Post()
  async createUser(@Body() user: User) {
    this.logger.debug(`Creating user: ${JSON.stringify(user)}`);
    return this.userService.createUser(user);
  }

  @ApiOperation({ summary: 'Update existing user' })
  @ApiParam({ name: 'id', description: 'User ID to update' })
  //@ApiBody({ type: User, description: 'Updated user data' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() user: User) {
    this.logger.debug(`Updating user: ${JSON.stringify(user)}`);
    return this.userService.updateUser(id, user);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({ name: 'id', description: 'User ID to delete' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    this.logger.debug(`Deleting user: ${id}`);
    return this.userService.deleteUser(id);
  }
}
