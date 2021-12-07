import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entity/roles.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {

  constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) {}

  async getAllRoles() {
    const roles = await this.roleRepository.find()
    return roles;
  }

  async createRole(dto) {
    const role = await this.roleRepository.save(dto);
    return role;
  }

  async editRole() {
    
  }

  async deleteRole() {

  }
}
