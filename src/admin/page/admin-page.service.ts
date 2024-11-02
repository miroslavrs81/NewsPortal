import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePageProfileDto } from './dto/create-pageProfile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageProfile } from 'src/entities/page-profile.entity';
import { UpdatePageProfileDto } from './dto/update-pageProfile.dto';
import { returnMessages } from 'src/helpers/error-message-mapper.helper';

@Injectable()
export class AdminPageService {
  constructor(
    @InjectRepository(PageProfile)
    private pageProfileRepository: Repository<PageProfile>,
  ) {}

  async getAboutPage(): Promise<PageProfile> {
    const aboutPage = await this.pageProfileRepository.findOne({
      where: { title: 'About' },
    });

    if (!aboutPage) {
      throw new NotFoundException(returnMessages.AboutPageNotFound);
    }
    return aboutPage;
  }

  async findPageProfileByTitle(title: string): Promise<PageProfile | null> {
    return await this.pageProfileRepository.findOne({
      where: { title },
    });
  }

  async createPage(pageProfileDto: CreatePageProfileDto): Promise<PageProfile> {
    const newProfile = this.pageProfileRepository.create(pageProfileDto);
    return await this.pageProfileRepository.save(newProfile);
  }

  async findAllPages(): Promise<PageProfile[]> {
    return await this.pageProfileRepository.find();
  }

  async findOne(id: number): Promise<PageProfile> {
    const pageProfile = await this.pageProfileRepository.findOneBy({ id });
    if (!pageProfile) {
      throw new NotFoundException(
        returnMessages.NotFoundPageProfileWithID + `${id}`,
      );
    }
    return pageProfile;
  }

  async updatePage(
    id: number,
    updatePageDto: UpdatePageProfileDto,
  ): Promise<PageProfile> {
    await this.pageProfileRepository.update(id, updatePageDto);
    return this.findOne(id);
  }

  async removePage(id: number): Promise<void> {
    await this.pageProfileRepository.delete(id);
  }
}
