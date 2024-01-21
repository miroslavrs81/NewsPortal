import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { News } from './news.entity';
import { Category } from './category.entity';

@Entity({ name: 'news_categories' })
export class NewsCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => News, (news) => news.categories)
  news: News;

  @ManyToOne(() => Category, (category) => category.news)
  category: Category;
}
