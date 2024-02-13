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
import { Image } from 'src/entities/image.entity';
import { makeUrlPath } from 'src/helpers/make-url-path.helper';
import * as fs from 'fs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateImageType } from 'src/types/image.type';
import { join } from 'path';
import { CreateImageDto } from './dto/create-image.dto';

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

  async createSingleImage(
    createImageDto: CreateImageDto,
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
      throw new NotFoundException(returnMessages.ImageNotFound);
    }
    const newsId = await this.newsRepository.findOne({
      where: { id: createImageDto.newsId },
    });
    if (!newsId) {
      throw new Error(returnMessages.NewsNotFound);
    }
    const newImage = await this.imagesRepository.save({
      name: newsimages.filename,
      news: newsId,
    });
    const path = makeUrlPath(['newsimagesStorage', newImage.name]);
    return {
      ...newImage,
      path,
    };
  }

  async createMultipleImages(
    createImageDto: CreateImageDto,
    newsimages: Array<Express.Multer.File>,
  ): Promise<CreateImageType[]> {
    const createdImages: CreateImageType[] = [];

    for (const image of newsimages) {
      const createdImage = await this.createSingleImage(createImageDto, image);
      createdImages.push(createdImage);
    }

    return createdImages;
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
