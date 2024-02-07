import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login-user.dto';
import { UserDto } from './dto/register.dto';
import { VerificationCodeDto } from './dto/verification-code.dto';
import { RegenerateCodeDto } from './dto/regenerate-code.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForgotPasswordDto } from './forgot-password.dto';

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() body: UserDto) {
    return await this.authService.register(body);
  }

  @Post('/login')
  async login(@Body() body: LoginDto) {
    return await this.authService.login(body);
  }

  @Post('/verification')
  async codeVerification(@Body() code: VerificationCodeDto) {
    return this.authService.codeVerification(code);
  }

  @Post('/regenerate-code')
  async regenerateCode(@Body() email: RegenerateCodeDto) {
    return await this.authService.regenerateCode(email);
  }

  @Post('/forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return await this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('/reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return await this.authService.resetPassword(token, resetPasswordDto);
  }
}
