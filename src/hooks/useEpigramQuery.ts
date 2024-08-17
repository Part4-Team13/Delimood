import { useInfiniteQuery } from '@tanstack/react-query';
import { GetEpigramListResponseType, PaginationRequest } from '../schema/epigramSchema';
import { getEpigramList } from '../apis/epigram';
import quries from '../apis/queries';

//무한 스크롤을 위한 useInfiniteQuery 훅
export const useGetEpigramListInfiniteQuery = (params: PaginationRequest) => {
  return useInfiniteQuery<GetEpigramListResponseType>({
    queryKey: quries.epigrams.list(params).queryKey,
    queryFn: ({ pageParam = 0 }) => getEpigramList({ ...params, cursor: pageParam as number }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });
};
