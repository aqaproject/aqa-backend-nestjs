import { SelectQueryBuilder } from 'typeorm';
import { FilterArgs } from '../args/filter.arg';
import { searchString } from './searchString';

export function filterQuery<T>(
  tableName: string,
  query: SelectQueryBuilder<T>,
  filter: FilterArgs,
) {
  const queriedByProgram = filter.program
    ? query.andWhere('Class.program = :program', { program: filter.program })
    : query;

  const queriedByFaculty = filter.faculty_id
    ? queriedByProgram.andWhere(
        "Subject.faculty_id ilike '%' || :faculty_id || '%'",
        {
          faculty_id: filter.faculty_id,
        },
      )
    : queriedByProgram;

  const queriedByKeyword = filter.keyword
    ? queriedByFaculty.andWhere(searchString(tableName, filter))
    : queriedByFaculty;

  const queriedBySemester = filter.semester_id
    ? queriedByKeyword.andWhere('Semester.semester_id = :semester_id', {
        semester_id: filter.semester_id,
      })
    : queriedByKeyword;

  return queriedBySemester;
}
