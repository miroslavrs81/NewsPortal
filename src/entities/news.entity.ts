import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { UserNews } from './user-news.entity';
import { NewsCategory } from './news_category.entity';

@Entity({ name: 'news' })
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.ownerNews)
  owner: User;

  @OneToMany(() => UserNews, (userNews) => userNews.news)
  users: UserNews[];

  @ManyToMany(() => NewsCategory, (newsCategory) => newsCategory.news, {
    cascade: true,
  })
  @JoinTable()
  newsCategories: NewsCategory[];

  @Column({ type: 'varchar', length: 50 })
  title: string;

  @Column({ type: 'datetime' })
  datetime: Date;

  @Column({ type: 'text' })
  text: string;

  @Column({ type: 'longblob' })
  image: Buffer;
}
