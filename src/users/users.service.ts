import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async getAllUsers() {
    return [{id: 1 , name: 'user1'}, {id: 2, name: 'usesr2'}];
  }

  async getOneUser(id) {
    return {id};
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.save(dto);
    return user;
  }

  async deleteAllUsers() {
    const users = await this.userRepository.find()
    this.userRepository.remove(users);
  }
}
