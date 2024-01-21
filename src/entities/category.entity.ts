import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { NewsCategory } from './news-category.entity';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => NewsCategory, (newsCategory) => newsCategory.category)
  news: NewsCategory[];

  @Column({ type: 'varchar', length: 50, default: 'others' })
  category: string;
}
