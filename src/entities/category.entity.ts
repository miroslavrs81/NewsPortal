import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { News } from './news.entity';
import { User } from './user.entity';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => News, (news) => news.category)
  news: News[];

  @ManyToOne(() => User, (user) => user.ownerNews)
  owner: User;

  @Column({ type: 'varchar', length: 50, default: 'others' })
  category: string;
}
