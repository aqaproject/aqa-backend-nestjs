export function searchString(
  keyword: string,
  matchCase = false,
  matchWholeWord = false,
) {
  if (matchCase && !matchWholeWord) {
  } else if (!matchCase && matchWholeWord) {
  } else if (matchCase && matchWholeWord) {
  } else {
    return `%${keyword}%`;
  }
}
