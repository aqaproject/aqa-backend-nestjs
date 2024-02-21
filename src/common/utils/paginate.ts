import { FindManyOptions, Repository } from 'typeorm';
import { PaginationArgs } from '../args/pagination.arg';
import { PaginatedMetaData } from '../dto/PaginatedMeta';

export async function paginate<T>(
  repo: Repository<T>,
  paginationOptions: PaginationArgs,
  options: FindManyOptions<T>,
) {
  const [data, count] = await repo.findAndCount({
    take: paginationOptions.size,
    skip: paginationOptions.page * paginationOptions.size,
    ...options,
  });

  return { data, meta: new PaginatedMetaData(paginationOptions, count) };
}

// export async function paginateWithQuery<T>(
//   query: SelectQueryBuilder<T>,
//   paginationOptions: PaginationArgs,
// ) {
//   return {};
// }
