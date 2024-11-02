import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Metadata } from './create-pageProfile.dto';

export class UpdatePageProfileDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({ type: Metadata, required: false })
  @IsOptional()
  metadata?: Metadata;
}
