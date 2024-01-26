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

@Injectable()
export class AdminNewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
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
