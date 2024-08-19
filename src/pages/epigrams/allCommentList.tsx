import CommentList from '../../components/CommentList';
import { useGetAllCommentsInfiniteQuery } from '../../hooks/useInfiniteQuery';

export default function AllCommentList() {
  const { data, fetchNextPage, isFetching } = useGetAllCommentsInfiniteQuery({ limit: 3 });

  return <CommentList data={data} fetchNextPage={fetchNextPage} isFetching={isFetching} isInfiniteScroll={false} buttonText='최신 댓글 더보기' />;
}
