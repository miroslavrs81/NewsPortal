import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

export class TeamMember {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  position: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  githubProfile?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  linkedInProfile?: string;
}

export class Metadata {
  @ApiProperty({ type: [TeamMember], required: false })
  @IsOptional()
  @IsArray()
  teamMembers?: TeamMember[];
}

export class CreatePageProfileDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty({ type: Metadata, required: false })
  @IsOptional()
  metadata?: Metadata;
}
