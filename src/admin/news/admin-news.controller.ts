import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminNewsService } from './admin-news.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateNewsDto } from './dto/create-news.dto';
import { News } from 'src/entities/news.entity';
import { AdminRoleGuard } from 'src/guards/admin-role.guard';
import { GetUser } from 'src/decorator/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/entities/user.entity';

@UseGuards(AdminRoleGuard)
@ApiTags('admin-news')
@ApiBearerAuth()
@Controller('/admin/news')
export class AdminNewsController {
  constructor(private readonly newsService: AdminNewsService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createNews(
    @GetUser() user: User,
    @Body() newsDto: CreateNewsDto,
  ): Promise<News> {
    return this.newsService.createNews(user, newsDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(204)
  @Delete('/:id')
  async removeNews(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ) {
    return await this.newsService.removeNews(+id, user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch('/:id/restore')
  async restoreNews(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<News> {
    return await this.newsService.restoreNews(+id, user);
  }
}
