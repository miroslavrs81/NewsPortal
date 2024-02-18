import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { News } from './news.entity';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => News, (news) => news.category)
  news: News[];

  @Column({ type: 'varchar', length: 50 })
  name: string;
}
