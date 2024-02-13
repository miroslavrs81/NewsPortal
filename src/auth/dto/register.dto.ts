import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, IsEmail, IsOptional } from 'class-validator';
import { returnMessages } from 'src/helpers/error-message-mapper.helper';

export class UserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    {
      message: returnMessages.PasswordTooWeak,
    },
  )
  password: string;

  @IsOptional()
  verifiedEmail: string;
}
