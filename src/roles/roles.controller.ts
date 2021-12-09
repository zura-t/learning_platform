import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  getAllRoles() {
    return this.rolesService.getAllRoles();
  }
  
  @Post()
  createRole(@Body() dto: CreateRoleDto) {
    return this.rolesService.createRole(dto);
  }

  @Put(':id')
  editRole(@Query() id: string) {
    return this.rolesService.editRole();
  }

  @Delete()
  deleteRole() {
    return this.rolesService.deleteRole();
  }
}
