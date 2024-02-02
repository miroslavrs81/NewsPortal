import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AdminNewsService } from './admin-news.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateNewsDto } from './dto/create-news.dto';
import { News } from 'src/entities/news.entity';
import { AdminRoleGuard } from 'src/guards/admin-role.guard';
import { GetUser } from 'src/decorator/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/entities/user.entity';
import { UpdateNewsDto } from './dto/update-news.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { newsImagesStorage } from 'src/config/multer.config';
import { FileValidator } from 'src/validators/file.validator';
import { CreateImageType } from 'src/types/image.type';
import { CreateImageDto } from './dto/create-image.dto';

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
  @Put('/:id')
  async updateNews(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNewsDto: UpdateNewsDto,
    @GetUser() user: User,
  ) {
    return await this.newsService.updateNews(+id, updateNewsDto, user);
  }

  // @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       images: {
  //         type: 'array',
  //         items: {
  //           type: 'string',
  //           format: 'binary',
  //         },
  //       },
  //     },
  //   },
  // })
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard)
  // @Post('/upload')
  // @UseInterceptors(FilesInterceptor('newsimages', 5, newsImagesStorage))
  // async uploadImages(
  //   @UploadedFiles(FileValidator)
  //   newsimages: Express.Multer.File[],
  //   @GetUser() user: User,
  // ): Promise<{
  //   imagesUploaded: { id: number; name: string; path: string }[];
  //   imagesFailed: { name: string; message: string }[];
  // }> {
  //   return await this.newsService.uploadImages(newsimages, user);
  // }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        newsimages: {
          type: 'string',
          format: 'binary',
        },
        newsId: {
          type: 'number',
        },
      },
    },
  })
  @Post('/newsimages')
  @UseInterceptors(FileInterceptor('newsimages', newsImagesStorage))
  async createImage(
    @Body() createImageDto: CreateImageDto,
    @UploadedFile(FileValidator)
    newsimages: Express.Multer.File,
  ): Promise<CreateImageType> {
    return await this.newsService.createImage(createImageDto, newsimages);
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
