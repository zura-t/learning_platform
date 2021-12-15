import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/users.entity';
import { RolesService } from 'src/roles/roles.service';
import { Repository } from 'typeorm';
import { CreateUserDto, RegisterStudentDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>, private roleService: RolesService) {}

  async getAllUsers() {
    const users = await this.userRepository.find();
    return users;
  }
  
  async getUserById(id) {
    const user = await this.userRepository.findOne({id});
    return user;
  }

  async getUserByName(name) {
    const user = await this.userRepository.findOne({name});
    return user;
  }

  async getUserByEmail(email) {
    const user = await this.userRepository.findOne({email});
    return user;
  }

  async createStudent(dto: RegisterStudentDto) {
    let user;
    if (dto.is_parent) {
      const roleParent = await this.roleService.getRoleByValue('student parent');
      const roleChild = await this.roleService.getRoleByValue('student child');

      user = await this.userRepository.save({...dto, role: 'student parent', role_id: roleParent.id});
    } else {
      const roleStudent = await this.roleService.getRoleByValue('student');

      user = await this.userRepository.save({...dto, role: 'student', role_id: roleStudent.id});
    }
    
    return user;
  }

  async createUserByAdmin(dto: CreateUserDto) {
    const role = await this.roleService.getRoleByValue(dto.role);
    
    const user = await this.userRepository.save({...dto, password: "123", role_id: role.id});
    return user;
  }

  async deleteAllUsers() {
    const users = await this.userRepository.find()
    this.userRepository.remove(users);
  }
}
