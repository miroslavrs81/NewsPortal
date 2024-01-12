import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { returnMessages } from 'src/helpers/error-message-mapper.helper';

export class CreateNewsDto {
  @ApiProperty()
  @IsString()
  @Length(1, 50, {
    message: returnMessages.TitleLength,
  })
  title: string;

  @IsDateString()
  datetime: Date;

  @ApiProperty()
  @IsString()
  text: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  images?: string[];
}
