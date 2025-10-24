// hooks/useCharacters.ts
import { getCharactersByPage } from "@/services/characters";
import { CharactersResponse } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";

const CHARACTERS_QUERY_KEY = "characters";

interface UseCharactersOptions {
  search?: string;
}

export const useCharacters = (options: UseCharactersOptions = {}) => {
  const { search = "" } = options;

  const query = useInfiniteQuery<CharactersResponse>({
    queryKey: [CHARACTERS_QUERY_KEY, search],
    queryFn: ({ pageParam = 1 }) =>
      getCharactersByPage(pageParam as number, search),
    getNextPageParam: (lastPage) => {
      return lastPage.info.next
        ? lastPage.info.next.split("page=")[1]
        : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const allCharacters = query.data?.pages.flatMap((page) => page.results) || [];

  return {
    characters: allCharacters,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isFetchingNextPage: query.isFetchingNextPage,
    hasNextPage: !!query.hasNextPage,
    fetchNextPage: query.fetchNextPage,
    refetch: query.refetch,
    error: query.error,
    isError: query.isError,
  };
};
