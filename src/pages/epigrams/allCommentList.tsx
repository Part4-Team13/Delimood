import CommentList from '../../components/CommentList';
import { useGetAllCommentsInfiniteQuery } from '../../hooks/useInfiniteQuery';
import { useGetMeQuery } from '../../hooks/useUserQuery';

export default function AllCommentList() {
  const { data: userData } = useGetMeQuery();
  const { data, fetchNextPage, isFetching } = useGetAllCommentsInfiniteQuery({ limit: 3 });

  //userData가 있을 경우에만 userId 전달하도록 설정
  return <CommentList data={data} fetchNextPage={fetchNextPage} isFetching={isFetching} isInfiniteScroll={false} buttonText='최신 댓글 더보기' {...(userData && { userId: userData.id })} />;
}
