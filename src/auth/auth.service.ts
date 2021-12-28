import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterStudentDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: any) {
    const payload = { name: user.name, id: user.id, role: user.role };
    return {
      payload,
      access_token: this.jwtService.sign(payload, {
        secret: process.env.SECRET_KEY,
      }),
    };
  }

  async redirect(req) {
    let userFromDB = await this.userService.getUserByEmail(req.user.email);

    if (!userFromDB) {
      const user = await this.userService.createStudent({email: req.user.email, role: req.user.role, name: `${req.user.firstName} ${req.user.lastName}`});

      const access_token = this.jwtService.sign(
        { email: user.email, name: user.name, id: user.id },
        { secret: process.env.SECRET_KEY },
      )

      return {
        message: 'User information from google',
        user,
        access_token 
      };
    }

    const access_token = this.jwtService.sign(
      { email: userFromDB.email, name: userFromDB.name, id: userFromDB.id },
      { secret: process.env.SECRET_KEY },
    )

    return {
      message: 'User information from google',
      userFromDB,
      access_token 
    };
  }

  async registration(registerDto: RegisterStudentDto) {
    const candidate = await this.userService.getUserByEmail(registerDto.email);
    if (candidate) {
      throw new HttpException(
        'пользователь с таким email существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(registerDto.password, 5);
    const user = await this.userService.createStudent({
      ...registerDto,
      password: hashPassword,
    });
    return {
      user,
      access_token: this.jwtService.sign(
        { name: user.name, id: user.id, role: user.role },
        { secret: process.env.SECRET_KEY },
      ),
    };
  }

  async validateUser(name: string, password: string): Promise<any> {
    try {
      const user = await this.userService.getUserByName(name);
      const passwordEquals = await bcrypt.compare(password, user.password);

      if (user && passwordEquals) {
        return user;
      }
      return null;
    } catch (e) {}
  }
}
