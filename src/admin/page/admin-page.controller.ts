import {
  Body,
  Post,
  Render,
  Controller,
  Get,
  UseGuards,
  Put,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminPageService } from './admin-page.service';
import { AdminDashboardService } from '../dashboard/admin-dashboard.service';
import { AdminRoleGuard } from 'src/guards/admin-role.guard';
import { CreatePageProfileDto } from './dto/create-pageProfile.dto';
import { PageProfile } from 'src/entities/page-profile.entity';
import { UpdatePageProfileDto } from './dto/update-pageProfile.dto';
import { returnMessages } from 'src/helpers/error-message-mapper.helper';

@ApiTags('admin-pages')
@ApiBearerAuth()
@UseGuards(AdminRoleGuard)
@Controller('/admin')
export class AdminPageController {
  constructor(
    private readonly pageService: AdminPageService,
    private readonly dashboardService: AdminDashboardService,
  ) {}

  @Get('/dashboard')
  @Render('dashboard.ejs')
  async getDashboardPage() {
    const totals = await this.dashboardService.getTotals();
    return {
      title: 'Dashboard',
      totals,
    };
  }

  @Get('/about')
  async renderAbout(@Res() res: Response) {
    try {
      const pageProfileData =
        await this.pageService.findPageProfileByTitle('About');

      if (!pageProfileData) {
        return HttpStatus.NOT_FOUND;
      }

      res.render('about', pageProfileData);
    } catch (error) {
      console.error(error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(returnMessages.AboutPageNotFound);
    }
  }

  @Post(`/page`)
  async createPage(
    @Body() pageProfileDto: CreatePageProfileDto,
  ): Promise<PageProfile> {
    return await this.pageService.createPage(pageProfileDto);
  }

  @Get(`/page/allPages`)
  async findAllPages(): Promise<PageProfile[]> {
    return await this.pageService.findAllPages();
  }

  @Get('/page/:id')
  async findOne(@Param('id') id: number): Promise<PageProfile> {
    return await this.pageService.findOne(id);
  }

  @Put('/page/:id')
  async updatePage(
    @Param('id') id: number,
    @Body() updatePageDto: UpdatePageProfileDto,
  ): Promise<PageProfile> {
    return await this.pageService.updatePage(id, updatePageDto);
  }

  @Delete('/page/:id')
  async removePage(@Param('id') id: number): Promise<void> {
    return await this.pageService.removePage(id);
  }
}
