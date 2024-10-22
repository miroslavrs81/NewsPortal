import { IsEmail, IsUrl } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'page_profiles' })
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  firstName: string;

  @Column({ type: 'varchar', length: 30 })
  lastName: string;

  @Column({ type: 'varchar', length: 30 })
  position: string;

  @IsEmail()
  @Column({ type: 'varchar', unique: true, length: 50 })
  email: string;

  @IsUrl()
  @Column({ type: 'varchar', length: 50 })
  githubProfile?: string;

  @IsUrl()
  @Column({ type: 'varchar', length: 50 })
  linkedInProfile?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
