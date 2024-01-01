import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { News } from './news.entity';

@Entity({ name: 'users_news' })
export class UserNews {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => News, (news) => news.users)
  news: News;

  @ManyToOne(() => User, (user) => user.news)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
