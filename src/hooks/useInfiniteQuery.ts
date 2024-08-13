import { useInfiniteQuery } from '@tanstack/react-query';
import quries from '../apis/queries';
import { PaginationRequest } from '../schema/epigramSchema';
import { getComments } from '../apis/comment';
import { getCommentList } from '../apis/epigram';

export const useGetAllCommentsInfiniteQuery = (params: PaginationRequest) => {
  return useInfiniteQuery({
    queryKey: quries.comments.getComments(params).queryKey,
    queryFn: ({ pageParam = 1 }) => getComments({ ...params, cursor: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor || null,
  });
};

export const useEpigramCommentsInfiniteQuery = (id: number, params: PaginationRequest) => {
  return useInfiniteQuery({
    queryKey: quries.epigrams.comments(id, params).queryKey,
    queryFn: ({ pageParam = 1 }) => getCommentList(id, { ...params, cursor: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor || null,
  });
};
