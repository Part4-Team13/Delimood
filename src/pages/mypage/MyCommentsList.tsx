import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetMyCommentInfiniteQuery } from '../../hooks/useInfiniteQuery';
import CommentList from '../../components/CommentList';
import Search from '../../assets/ico_mypage_search.svg';

interface MyCommentsListProps {
  userId: number;
  onTotalCountFetched: (totalCount: number) => void;
}

//내 댓글 리스트를 보여주는 컴포넌트
const MyCommentsList: React.FC<MyCommentsListProps> = ({ userId, onTotalCountFetched }) => {
  const { data, fetchNextPage, isFetching } = useGetMyCommentInfiniteQuery({ limit: 4, id: userId });

  useEffect(() => {
    if (data?.pages?.[0]?.totalCount !== undefined) {
      onTotalCountFetched(data.pages[0].totalCount);
    }
  }, [data, onTotalCountFetched]);

  const isEmpty = data?.pages?.[0]?.totalCount === 0;

  const navigate = useNavigate();
  const onClickMyEpigramList = () => {
    navigate(`/board`);
  };

  return (
    <div>
      {isEmpty ? (
        <div className='w-[312px] h-[304px] flex flex-col items-center justify-center gap-2 tablet:gap-4 desktop:gap-6 tablet:w-[384px] desktop:w-[640px] desktop:h-[488px]'>
          <img src={Search} alt='돋보기' className='desktop:w-[144px]' />
          <div className='flex-col flex items-center gap-8 tablet:gap-10 desktop:gap-12 text-sm font-normal desktop:text-xl'>
            <span className='flex-col flex items-center'>
              아직 작성한 댓글이 없어요! <p />
              댓글을 달고 다른 사람들과 교류해보세요.
            </span>
            <button
              onClick={onClickMyEpigramList}
              className='border-gray-100 rounded-[100px] border px-[18px] py-[12px] desktop:px-[20px] text-black-400 hover:bg-black-950 hover:text-white focus:bg-black-950 focus:text-white'
            >
              에피그램 둘러보기
            </button>
          </div>
        </div>
      ) : (
        <CommentList data={data} fetchNextPage={fetchNextPage} isFetching={isFetching} userId={userId} isInfiniteScroll={false} buttonText='최신 댓글 더보기' />
      )}
    </div>
  );
};

export default MyCommentsList;
