import { Body, Controller, HttpException, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto, LoginDto, RegisterStudentDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}
  
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('registration')
  registration(@Body() registerDto: RegisterStudentDto) {
    return this.authService.registration(registerDto);
  }
}
