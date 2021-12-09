import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto, RegisterStudentDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getOneUser(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Post()
  createUserByAdmin(@Body() dto: CreateUserDto) {
    return this.usersService.createUserByAdmin(dto);
  }

  @Post()
  createStudent(@Body() dto: RegisterStudentDto) {
    return this.usersService.createStudent(dto);
  }

  @Delete()
  deleteAllUsers() {
    return this.usersService.deleteAllUsers();
  }
}
