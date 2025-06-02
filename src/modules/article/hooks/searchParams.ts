import {
  createLoader,
  parseAsArrayOf,
  parseAsString,
} from "nuqs/server";

const params = {
  search: parseAsString.withOptions({
    clearOnDefault: true,
  }).withDefault(""),
  tags: parseAsArrayOf(parseAsString)
    .withOptions({
      clearOnDefault: true,
    })
    .withDefault([]),
};
export const loadArticleFilters = createLoader(params);
