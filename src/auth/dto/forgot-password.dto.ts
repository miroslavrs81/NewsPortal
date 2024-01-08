import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEmpty } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty()
  @IsEmpty()
  @IsEmail()
  email: string;
}
