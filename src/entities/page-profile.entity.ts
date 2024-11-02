import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'page_profiles' })
export class PageProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'json', nullable: true })
  metadata: {
    teamMembers?: Array<{
      firstName: string;
      lastName: string;
      position: string;
      email: string;
      githubProfile: string;
      linkedInProfile: string;
    }>;
  };

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
