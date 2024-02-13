import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';
import { returnMessages } from 'src/helpers/error-message-mapper.helper';

export class ResetPasswordDto {
  @ApiProperty()
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    {
      message: returnMessages.PasswordTooWeak,
    },
  )
  newPassword: string;
}
