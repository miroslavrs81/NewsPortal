import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { News } from './news.entity';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => News, (news) => news.categories)
  news: News[];

  @Column({ type: 'varchar', length: 50, default: 'others' })
  category: string;
}
