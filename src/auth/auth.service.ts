import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterStudentDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {

  constructor(
    private userService: UsersService, 
    private jwtService: JwtService
    ) {}

  async login(user: any) {
    const payload = {name: user.name, id: user.id};
    return {
      payload, 
      access_token: this.jwtService.sign(payload, {secret: process.env.SECRET_KEY})
    };
  }

  async registration(registerDto: RegisterStudentDto) {
    const candidate = await this.userService.getUserByEmail(registerDto.email)
    if (candidate) {
      throw new HttpException('пользователь с таким email существует', HttpStatus.BAD_REQUEST)
    }
    const hashPassword = await bcrypt.hash(registerDto.password, 5)
    const user = await this.userService.createStudent({...registerDto, password: hashPassword});
    return user;
  }

  async validateUser(name: string, password: string): Promise<any> {
    try {
      const user = await this.userService.getUserByName(name);
      const passwordEquals = await bcrypt.compare(password, user.password)
      
      if (user && passwordEquals) {
        return user;
      }
      return null;
    } catch (e) {}
  }
}
