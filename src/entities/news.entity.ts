import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'news' })
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.ownerNews)
  owner: User;

  @Column({ type: 'string' })
  title: string;

  @Column({ type: 'datetime' })
  datetime: Date;

  @Column({ type: 'varchar', length: 50 })
  category: string;

  @Column({ type: 'text' })
  text: string;

  @Column({ type: 'longblob' })
  image: Buffer;
}
