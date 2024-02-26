import { SelectQueryBuilder } from 'typeorm';
import { FilterArgs } from '../args/filter.arg';
import { searchString } from './searchString';

export function filterQuery<T>(
  tableName: string,
  query: SelectQueryBuilder<T>,
  filter: FilterArgs,
) {
  return query
    .andWhere('Class.program = :program')
    .andWhere("subject.faculty_id ilike '%' || :faculty_id || '%'", {
      faculty_id: '',
    })
    .andWhere(searchString(tableName, filter));
}
