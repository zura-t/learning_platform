import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/users.entity';
import { FilesService } from 'src/files/files.service';
import { RolesService } from 'src/roles/roles.service';
import { getConnection, Repository } from 'typeorm';
import { CreateUserDto, RegisterStudentDto, UpdateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>, 
    private roleService: RolesService,
    private filesService: FilesService
    ) {}

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
      user = await this.userRepository.save({...dto, role: 'student parent', role_id: roleParent.id});
    } else {
      const roleStudent = await this.roleService.getRoleByValue('student');
      user = await this.userRepository.save({...dto, role: 'student', role_id: roleStudent.id});
    }
    return user;
  }

  async createUserByAdmin(dto: CreateUserDto) {
    const role = await this.roleService.getRoleByValue(dto.role);
    const hashPassword = await bcrypt.hash('123', 5);
    const user = await this.userRepository.save({...dto, password: hashPassword, role_id: role.id});
    return user;
  }

  async changePassword(userId, oldPassword, newPassword) {
    const user = await this.getUserById(userId);
    const passwordEquals = await bcrypt.compare(oldPassword, user.password);
    if (user && passwordEquals && newPassword) {
      const hashPassword = await bcrypt.hash(newPassword, 5);
      user.password = hashPassword;
      await this.userRepository.save(user);
      return 'password changed';
    }
  }

  async updateUser(id, dto: UpdateUserDto, file?) {
    if (file) {
      const user = await this.getUserById(id);
      if (user.avatar) {
        this.filesService.deleteFile(user.avatar);
      }
      const avatar = await this.filesService.createFile(file);
      dto.avatar = avatar;
    }
    if (dto.avatar === null) {
      const user = await this.getUserById(id);
      if (user.avatar) {
        this.filesService.deleteFile(user.avatar)
      }
    }
    await getConnection()
    .createQueryBuilder()
    .update(User)
    .set({...dto})
    .where("id = :id", {id})
    .execute();
    return 'Данные пользователя обновлены';
  }

  async deleteAllUsers() {
    const users = await this.userRepository.find();
    this.userRepository.remove(users);
  }
}
