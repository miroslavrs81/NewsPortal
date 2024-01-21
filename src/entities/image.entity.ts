import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { News } from './news.entity';

@Entity({ name: 'images' })
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => News, (news) => news.images, { onDelete: 'CASCADE' })
  news: News;

  @Column({ type: 'uuid' })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
