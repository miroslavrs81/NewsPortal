import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { UserNews } from './user-news.entity';
import { Category } from './category.entity';

@Entity({ name: 'news' })
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.ownerNews)
  owner: User;

  @OneToMany(() => UserNews, (userNews) => userNews.news)
  users: UserNews[];

  @ManyToOne(() => Category, (category) => category.news)
  category: Category;

  @Column({ type: 'varchar', length: 50 })
  title: string;

  @Column({ type: 'datetime' })
  datetime: Date;

  @Column({ type: 'text' })
  text: string;

  @Column({ type: 'uuid', nullable: true })
  images: string[];
}
