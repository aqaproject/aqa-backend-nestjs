import { FindManyOptions, Repository, SelectQueryBuilder } from 'typeorm';
import { PaginationArgs } from '../args/pagination.arg';
import { PaginatedMetaData } from '../dto/PaginatedMeta';
import { FilterArgs } from '../args/filter.arg';

type PaginatedData<T> = Promise<{ data: T[]; meta: PaginatedMetaData }>;

export async function paginate<T>(
  repo: Repository<T>,
  paginationOptions: PaginationArgs,
  options: FindManyOptions<T>,
): PaginatedData<T> {
  const [data, count] = await repo.findAndCount({
    take: paginationOptions.size,
    skip: paginationOptions.page * paginationOptions.size,
    ...options,
  });

  return { data, meta: new PaginatedMetaData(paginationOptions, count) };
}

export async function paginateByQuery<T>(
  query: SelectQueryBuilder<T>,
  paginationOptions: PaginationArgs,
  filter: FilterArgs,
  options: FindManyOptions<T>,
): PaginatedData<T> {
  const querySql = query
    .take(paginationOptions.size)
    .skip(paginationOptions.page * paginationOptions.size)
    .setFindOptions(options)
    .setParameters(filter);

  console.log({ sql: querySql.getSql() });

  const [data, count] = await querySql.getManyAndCount();

  return { data, meta: new PaginatedMetaData(paginationOptions, count) };
}
