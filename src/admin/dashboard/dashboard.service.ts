import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterOperator,
  PaginateConfig,
  PaginateQuery,
  Paginated,
  paginate,
} from 'nestjs-paginate';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUsersList(query: PaginateQuery): Promise<Paginated<User>> {
    const paginateConfig: PaginateConfig<User> = {
      defaultLimit: 50,
      sortableColumns: ['id'],
      relations: [],
      defaultSortBy: [['id', 'ASC']],
      searchableColumns: ['name', 'email'],
      select: [
        'id',
        'name',
        'email',
        'isActive',
        'role',
        'createdAt',
        'updatedAt',
        'deletedAt',
        'emailVerifiedAt',
      ],
      filterableColumns: { role: [FilterOperator.EQ] },
    };
    const qb = this.userRepository.createQueryBuilder('users');
    return await paginate<User>(query, qb, paginateConfig);
  }
}
