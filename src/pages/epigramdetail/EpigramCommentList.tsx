import img_magnifier from '../../assets/img_magnifier.png';
import CommentList from '../../components/CommentList';
import { useGetEpigramCommentsInfiniteQuery } from '../../hooks/useInfiniteQuery';

function EpigramCommentList({ epigramId, userId }: { epigramId: number; userId: number }) {
  const { data: commentData, fetchNextPage, isFetching } = useGetEpigramCommentsInfiniteQuery(epigramId, { limit: 4 });

  if (commentData?.pages[0].totalCount == 0) {
    return (
      <div className='cursor-default flex flex-col w-fit mx-auto items-center gap-[8px] desktop:gap-[24px] mb-[294px] mt-[80px] tablet:mb-[210px] desktop:mb-[232px] desktop:mt-[124px]'>
        <img src={img_magnifier} alt='돋보기 아이콘' className='w-[96px] desktop:w-[144px]' />
        <p className='text-center text-md desktop:text-xl'>
          아직 댓글이 없어요! <br />첫 번째 댓글 작성자가 되어보세요.
        </p>
      </div>
    );
  } else {
    return <CommentList data={commentData} fetchNextPage={fetchNextPage} isFetching={isFetching} isInfiniteScroll userId={userId} />;
  }
}

export default EpigramCommentList;
