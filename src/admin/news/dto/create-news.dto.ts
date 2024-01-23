import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
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

  @ApiProperty()
  @IsString()
  text: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  categoryId?: number[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  images?: string[];
}
