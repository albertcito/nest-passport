import { Controller, Get, Request } from '@nestjs/common';
import { AppService } from './app.service';
// import { AuthLocalGuard } from './modules/people/auth/auth.local.guard';
// import { Public } from './modules/people/auth/public.route';
// import { AuthService } from './modules/people/auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  /*
  @UseGuards(AuthLocalGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
 */
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
