"use client";
import {
  parseAsArrayOf,
  parseAsString,
  useQueryStates,
} from "nuqs";

const params = {
  search: parseAsString
    .withOptions({
      clearOnDefault: true,
    })
    .withDefault(""),
  tags: parseAsArrayOf(parseAsString)
    .withOptions({
      clearOnDefault: true,
    })
    .withDefault([]),
};
export const useArticleFilters = () => {
  return useQueryStates(params);
};
