import React, { useEffect } from 'react';
import { useGetMyCommentInfiniteQuery } from '../../hooks/useInfiniteQuery';
import CommentList from '../../components/CommentList';

interface MyCommentsListProps {
  userId: number;
  onTotalCountFetched: (totalCount: number) => void;
}

const MyCommentsList: React.FC<MyCommentsListProps> = ({ userId, onTotalCountFetched }) => {
  const { data, fetchNextPage, isFetching } = useGetMyCommentInfiniteQuery({ limit: 4, id: userId });

  useEffect(() => {
    if (data?.pages?.[0]?.totalCount !== undefined) {
      onTotalCountFetched(data.pages[0].totalCount);
    }
  }, [data, onTotalCountFetched]);

  return <CommentList data={data} fetchNextPage={fetchNextPage} isFetching={isFetching} userId={userId} isInfiniteScroll={false} buttonText='최신 댓글 더보기' />;
};

export default MyCommentsList;
