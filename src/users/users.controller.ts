import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Request, UploadedFile, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateUserDto, RegisterStudentDto, UpdateUserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { Public } from 'src/decorators/public.decorator';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from 'src/files/files.service';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@Controller('users')
export class UsersController {
  
  constructor(private readonly usersService: UsersService) {};

  // @Roles(Role.Admin)
  @Public()
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Public()
  @Get(':id')
  getOneUser(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  // @Roles(Role.Admin)
  @Public()
  @Post('createByAdmin')
  createUserByAdmin(@Body() dto: CreateUserDto) {
    return this.usersService.createUserByAdmin(dto);
  }

  @Post('changePassword')
  changePassword(@Body() {userId, oldPassword, newPassword}) {
    return this.usersService.changePassword(userId, oldPassword, newPassword);
  }
  
  @Public()
  @Put(':id')
  @UseInterceptors(FileInterceptor('avatar'))
  async updateUser(@Param('id') id: string, @UploadedFile() file: Express.Multer.File, @Body() dto) {
    return this.usersService.updateUser(id, dto, file);
  }

  @Delete()
  deleteAllUsers() {
    return this.usersService.deleteAllUsers();
  }
}