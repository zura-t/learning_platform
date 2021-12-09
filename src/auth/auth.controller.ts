import { Body, Controller, HttpException, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto, LoginDto, RegisterStudentDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}
  
  @UseGuards(JwtAuthGuard)
  @Post('login')
  login(@Request() req) {
    console.log(req.body);
    
    return this.authService.login(req.body);
  }

  @Post('/registration')
  registration(@Body() registerDto: RegisterStudentDto) {
    return this.authService.registration(registerDto);
  }
}
