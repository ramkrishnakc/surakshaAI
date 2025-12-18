import { Body, Controller, Post, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as dto from './auth.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { IRequest } from 'src/common/types';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signup(@Body() data: dto.SignupDto) {
    await this.authService.signup(data);
    return { message: 'User created successfully' };
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() data: dto.LoginDto) {
    return await this.authService.login(data);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@Body('refreshToken') token: string) {
    return await this.authService.refreshToken(token);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Req() req: Request) {
    return await this.authService.logout((req as unknown as IRequest).user);
  }
}
