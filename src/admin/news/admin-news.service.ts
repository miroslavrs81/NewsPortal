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
import { NewsCategory } from 'src/entities/news-category.entity';
import { returnMessages } from 'src/helpers/error-message-mapper.helper';

@Injectable()
export class AdminNewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(NewsCategory)
    private newsCategoryRepository: Repository<NewsCategory>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createNews(author: User, newsDto: CreateNewsDto): Promise<News> {
    const news = await this.newsRepository.save({
      author,
      title: newsDto.title,
      text: newsDto.text,
      categoryId: newsDto.categoryId,
    });

    //to fix categoryId
    await this.newsCategoryRepository.save({
      news,
      categoryId: newsDto.categoryId,
    });
    return news;
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
