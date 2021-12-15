import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CreateUserDto, RegisterStudentDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('users')
export class UsersController {
  
  constructor(private readonly usersService: UsersService) {};

  @Roles(Role.Admin)
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getOneUser(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  // @Roles(Role.Admin)
  @Post('create')
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
