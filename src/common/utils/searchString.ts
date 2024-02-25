import { FilterArgs } from '../args/filter.arg';

export function searchString(
  filter: FilterArgs,
  matchCase = false,
  matchWholeWord = false,
) {
  if (matchCase && !matchWholeWord) {
  } else if (!matchCase && matchWholeWord) {
  } else if (matchCase && matchWholeWord) {
  } else {
    return "unaccent(Criteria.display_name) ilike ('%' || unaccent(:keyword) || '%')";
  }
}
