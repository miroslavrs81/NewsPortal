import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateImageDto {
  @ApiProperty()
  @IsOptional()
  newsId?: number;
}
