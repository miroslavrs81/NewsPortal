import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { News } from './news.entity';

@Entity({ name: 'news_categories' })
export class NewsCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => News, (news) => news.newsCategories)
  news: News[];

  @Column({ type: 'varchar', length: 50, default: 'others' })
  category: string;
}
