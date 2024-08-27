import { useInfiniteQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import quries from '../apis/queries';
import { PaginationRequest } from '../schema/epigramSchema';
import { getCommentList, getComments } from '../apis/comment';
import { GetUserCommentRequestType } from '../schema/userSchema';
import { getUserComment } from '../apis/user';

export const useGetAllCommentsInfiniteQuery = (params: PaginationRequest) => {
  return useInfiniteQuery({
    queryKey: quries.comments.getComments(params).queryKey,
    queryFn: ({ pageParam = 1 }) => getComments({ ...params, cursor: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};

export const useGetEpigramCommentsInfiniteQuery = (id: number, params: PaginationRequest) => {
  return useSuspenseInfiniteQuery({
    queryKey: quries.epigrams.comments(id, params).queryKey,
    queryFn: ({ pageParam = 1 }) => getCommentList(id, { ...params, cursor: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor || null,
  });
};

export const useGetMyCommentInfiniteQuery = (params: GetUserCommentRequestType) => {
  return useSuspenseInfiniteQuery({
    queryKey: quries.user.getUserComment(params).queryKey,
    queryFn: ({ pageParam = 1 }) => getUserComment({ ...params, cursor: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};
