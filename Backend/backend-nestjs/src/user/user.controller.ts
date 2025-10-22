// backend-nestjs/src/user/user.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users') // <-- Todas las rutas aquí empiezan con /users
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() userDto: { name: string; email: string }): Promise<User> {
    return this.userService.create(userDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    // ParseIntPipe convierte el 'id' de string (URL) a número
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() userDto: { name?: string; email?: string },
  ): Promise<User> {
    return this.userService.update(id, userDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.remove(id);
  }
}