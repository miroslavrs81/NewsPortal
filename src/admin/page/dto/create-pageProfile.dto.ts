import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreatePageProfileDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  position: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsOptional()
  @IsUrl()
  githubProfile?: string;

  @IsOptional()
  @IsUrl()
  linkedInProfile?: string;
}
