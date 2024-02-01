import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from 'src/entities/news.entity';
import { Repository } from 'typeorm';
import { CreateNewsDto } from './dto/create-news.dto';
import { User } from 'src/entities/user.entity';
import { Category } from 'src/entities/category.entity';
import { returnMessages } from 'src/helpers/error-message-mapper.helper';
import { UpdateNewsDto } from './dto/update-news.dto';
// import { existsSync, mkdirSync } from 'fs';
import { Image } from 'src/entities/image.entity';
import { makeUrlPath } from 'src/helpers/make-url-path.helper';
import * as fs from 'fs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateImageType } from 'src/types/image.type';
import { join } from 'path';
// import { CreateImageDto } from './dto/create-image.dto';
// import { resizeImage } from 'src/helpers/gm.helper';

@Injectable()
export class AdminNewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
    private em: EventEmitter2,
  ) {}

  async createNews(author: User, newsDto: CreateNewsDto): Promise<News> {
    const category = await this.categoryRepository.findOne({
      where: { id: newsDto.categoryId },
    });

    if (!category) {
      throw new Error(returnMessages.CategoryNotFound);
    }
    const news = await this.newsRepository.save({
      author,
      title: newsDto.title,
      text: newsDto.text,
      category: category,
    });
    return news;
  }

  async updateNews(id: number, updateNewsDto: UpdateNewsDto, user: User) {
    const news = await this.newsRepository
      .createQueryBuilder('news')
      .leftJoin('news.author', 'author')
      .where({ id, author: user.id })
      .getOne();

    if (!news) {
      throw new BadRequestException(returnMessages.NewsNotFound);
    }

    return await this.newsRepository.save({
      ...news,
      title: updateNewsDto.title,
      text: updateNewsDto.text,
    });
  }

  // async uploadImages(
  //   imagesUploaded: Array<Express.Multer.File>,
  //   user: User,
  // ): Promise<{
  //   imagesUploaded: { id: number; name: string; path: string }[];
  //   imagesFailed: { name: string; message: string }[];
  // }> {
  //   const uploadedPhotos = [];
  //   const failedPhotos = [];

  //   const thumbnailPath = join(
  //     __dirname,
  //     '../../../public/newsimages',
  //     process.env.BASE_THUMBNAIL_SIZE,
  //   );

  //   if (!existsSync(thumbnailPath)) {
  //     mkdirSync(thumbnailPath, { recursive: true });
  //   }

  //   for (const image of imagesUploaded) {
  //     const imagePath = join(
  //       __dirname,
  //       '../../../uploads/newsimages/',
  //       image.filename,
  //     );

  //     if (await resizeImage(imagePath, join(thumbnailPath, image.filename))) {
  //       const photo = await this.imagesRepository.save({
  //         name: image.filename,
  //         user,
  //       });

  //       uploadedPhotos.push({
  //         id: photo.id,
  //         name: photo.name,
  //         path: makeUrlPath([
  //           'newsimages',
  //           process.env.BASE_THUMBNAIL_SIZE,
  //           photo.name,
  //         ]),
  //       });
  //     } else {
  //       failedPhotos.push({
  //         name: image.originalname,
  //         message: `${image.originalname} can not be uploaded!`,
  //       });
  //       fs.rmSync(image.path);
  //     }
  //   }
  //   if (uploadedPhotos.length > 0) {
  //     this.em.emit('images.uploaded', { uploadedPhotos, user });
  //   }
  //   return { imagesUploaded: uploadedPhotos, imagesFailed: failedPhotos };
  // }

  async createImage(
    //  createImageDto: CreateImageDto,
    newsimages: Express.Multer.File,
  ): Promise<CreateImageType> {
    if (fs.existsSync(newsimages.path)) {
      fs.cpSync(
        newsimages.path,
        join(
          __dirname,
          '../../public/newsimagesStorage/' + newsimages.filename,
        ),
      );
    } else {
      throw new NotFoundException('Image does not exist');
    }
    /* const newsId = createImageDto.newsId;
    if (isNaN(newsId) || newsId <= 0) {
      throw new BadRequestException('Invalid newsId');
    }*/

    const newImage = await this.imagesRepository.save({
      name: newsimages.filename,
      /* newsId: +createImageDto.newsId,*/
    });
    const path = makeUrlPath(['newsimagesStorage', newImage.name]);
    return {
      ...newImage,
      path,
    };
  }

  async removeNews(id: number, user: User) {
    return await this.newsRepository
      .createQueryBuilder('news')
      .leftJoin('news.author', 'author')
      .softDelete()
      .where('news.id = :id', { id })
      .andWhere('author.id = :authorId', { authorId: user.id })
      .execute();
  }

  async restoreNews(id: number, user: User): Promise<News> {
    const news = await this.newsRepository
      .createQueryBuilder('news')
      .leftJoin('news.author', 'author')
      .withDeleted()
      .where('news.id = :id', { id })
      .andWhere('author.id = :authorId', { authorId: user.id })
      .getOne();

    if (!news) {
      throw new NotFoundException(returnMessages.NewsNotFound);
    }
    if (news.deletedAt === null) {
      throw new BadRequestException(returnMessages.NewsNotDeleted);
    }

    await this.newsRepository
      .createQueryBuilder('news')
      .restore()
      .where('news.id = :id', { id })
      .execute();

    const restoredNews = await this.newsRepository.findOneBy({ id });
    return restoredNews;
  }
}
