import { Controller, Body, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { UsersServices } from './users.services';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly userServices: UsersServices) {
  }

  @Get()
  getUsers() {
    return this.userServices.findAll();
  }

  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.userServices.findById(parseInt(id));
  }

  @Post()
  addUser(@Body() user: User) {
    return this.userServices.add(user);
  }

  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() user: User) {
    return this.userServices.update(parseInt(id), user);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userServices.remove(parseInt(id));
  }
}