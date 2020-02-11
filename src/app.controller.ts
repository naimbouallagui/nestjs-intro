import { Controller, Get, UseGuards, Post, Request, Body, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoggingInterceptor } from './interceptor/logging.interceptor';

@UseInterceptors(LoggingInterceptor)
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(AuthGuard('jwt'))
  @Post('auth/login')
  async login(@Body('username') username, @Body('password') password) {
    return this.authService.login({username, password});
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
