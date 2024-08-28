import CommentList from '../../components/CommentList';
import { useGetAllCommentsInfiniteQuery } from '../../hooks/useInfiniteQuery';
import { useGetMeQuery } from '../../hooks/useUserQuery';

export default function AllCommentList() {
  const { data: userData } = useGetMeQuery();
  const { data, fetchNextPage, isFetching } = useGetAllCommentsInfiniteQuery({ limit: 4 });

  return <CommentList data={data} fetchNextPage={fetchNextPage} isFetching={isFetching} isInfiniteScroll={false} buttonText='최신 댓글 더보기' userId={userData.id} />;
}
