import { useInfiniteQuery } from '@tanstack/react-query';
import quries from '../apis/queries';
import { GetCommentsRequestType } from '../schema/commentSchema';
import { getComments } from '../apis/comment';

export const useGetCommentsInfiniteQuery = (params: GetCommentsRequestType) => {
  return useInfiniteQuery({
    queryKey: quries.comments.getComments(params).queryKey,
    queryFn: ({ pageParam = 1 }) => getComments({ ...params, cursor: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor || null,
  });
};
