import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/entities/user.entity';

@Injectable()
export class MailVerificationListener {
  constructor(private readonly authService: AuthService) {}
  @OnEvent('user.created')
  async handleMailSending(user: User) {
    await this.authService.mailVerification(user);
  }
}
