import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Category } from './category.entity';

@Entity({ name: 'news' })
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.news)
  author: User;

  @ManyToMany(() => Category, (category) => category.news)
  @JoinTable()
  categories: Category[];

  @Column({ type: 'varchar', length: 50 })
  title: string;

  @CreateDateColumn({ type: 'datetime' })
  datetime: Date;

  @Column({ type: 'text' })
  text: string;

  @Column({ type: 'uuid', nullable: true })
  images: string[];

  @DeleteDateColumn()
  deletedAt: Date;
}
