import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { returnMessages } from 'src/helpers/error-message-mapper.helper';

export class UpdateNewsDto {
  @ApiProperty()
  @IsString()
  @Length(1, 50, {
    message: returnMessages.TitleLength,
  })
  title: string;

  @ApiProperty()
  @IsString()
  text: string;
}
