import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto, LoginDto, RegisterStudentDto } from 'src/users/dto/user.dto';
import { AuthService } from './auth.service';
import { Public } from '../decorators/public.decorator';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}
  
  @Public()
  @Post('registration')
  registration(@Body() registerDto: RegisterStudentDto) {
    return this.authService.registration(registerDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @UseGuards(AuthGuard('google'))
  @Get('google')
  googleLogin(@Req() req) {
    return HttpStatus.OK;
  }

  @Public()
  @UseGuards(AuthGuard('google'))
  @Get('google/redirect')
  googleRedirect(@Req() req) {
    return this.authService.redirect(req);
  }


  @Public()
  @UseGuards(AuthGuard("facebook"))
  @Get('facebook')
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Public()
  @UseGuards(AuthGuard("facebook"))
  @Get('facebook/redirect')
  async facebookRedirect(@Req() req): Promise<any> {
    return this.authService.redirect(req);
  }


  @Public()
  @UseGuards(AuthGuard("twitter"))
  @Get('twitter')
  async twitterLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Public()
  @UseGuards(AuthGuard("twitter"))
  @Get('twitter/redirect')
  async twitterRedirect(@Req() req): Promise<any> {
    return this.authService.redirect(req);
  }


  @Public()
  @UseGuards(AuthGuard("linkedin"))
  @Get('linkedin')
  async linkedinLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Public()
  @UseGuards(AuthGuard("linkedin"))
  @Get('linkedin/redirect')
  async linkedinRedirect(@Req() req): Promise<any> {
    return this.authService.redirect(req);
  }
}
