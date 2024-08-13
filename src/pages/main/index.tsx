import { useGetAllCommentsInfiniteQuery } from '../../hooks/useInfiniteQuery';
import CommentList from '../../components/CommentList';
import { useGetMeQuery } from '../../hooks/useUserQuery';

export default function Main() {
  const { data, fetchNextPage, isFetching } = useGetAllCommentsInfiniteQuery({ limit: 3 });
  // const { data, fetchNextPage, isFetching } = useEpigramCommentsInfiniteQuery(170, { limit: 3 });

  const { data: myData } = useGetMeQuery();
  if (myData) {
    console.log(myData.id);
  }

  return (
    <div className='mt-[2000px]'>
      <CommentList data={data} fetchNextPage={fetchNextPage} isFetching={isFetching} userId={myData ? myData.id : undefined} isInfiniteScroll />
    </div>
  );
}
