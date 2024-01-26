import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Image } from './image.entity';
import { Category } from './category.entity';

@Entity({ name: 'news' })
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.news)
  author: User;

  @ManyToOne(() => Category, (category) => category.news)
  category: Category;

  @OneToMany(() => Image, (images) => images.news)
  images: Image[];

  @Column({ type: 'varchar', length: 50 })
  title: string;

  @CreateDateColumn({ type: 'datetime' })
  datetime: Date;

  @Column({ type: 'text' })
  text: string;

  @DeleteDateColumn()
  deletedAt: Date;
}
