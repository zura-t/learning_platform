import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { CreateRoleDto } from './dto/createRoleDto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  getAllRoles() {
    return this.rolesService.getAllRoles()
  }
  
  @Post()
  createRole(@Body() dto: CreateRoleDto) {
    return this.rolesService.createRole(dto)
  }

  @Put(':id')
  editRole(@Query() id: string) {
    
  }

  @Delete()
  deleteRole() {
    return this.rolesService.createRole
  }
}
