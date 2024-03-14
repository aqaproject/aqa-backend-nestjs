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
  options?: FindManyOptions<T>,
): PaginatedData<T> {
  const querySql = query
    .setFindOptions(options)
    .setParameters(filter)
    .take(paginationOptions.size)
    .skip(paginationOptions.page * paginationOptions.size);

  console.log({ sql: querySql.getSql() });

  // try {
  //   const [data, count] = await querySql.getManyAndCount();
  //   console.log({ data });
  //   return { data, meta: new PaginatedMetaData(paginationOptions, count) };
  // } catch (error) {
  // }
  const count = (await querySql.getRawMany()).length;
  const data = await querySql
    .limit(paginationOptions.size)
    .offset(paginationOptions.page * paginationOptions.size)
    .getRawMany();
  return { data, meta: new PaginatedMetaData(paginationOptions, count) };
}
