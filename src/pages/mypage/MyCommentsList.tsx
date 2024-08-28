import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetMyCommentInfiniteQuery } from '../../hooks/useInfiniteQuery';
import CommentList from '../../components/CommentList';
import Search from '../../assets/ico_mypage_search.svg';
import SuspenseWrapper from '../../components/SuspenseWrapper';
import { motion } from 'framer-motion';

interface MyCommentsListProps {
  userId: number;
  onTotalCountFetched: (totalCount: number) => void;
}

//내 댓글 리스트를 보여주는 컴포넌트
const MyCommentsList: React.FC<MyCommentsListProps> = ({ userId, onTotalCountFetched }) => {
  const { data, fetchNextPage, isFetching } = useGetMyCommentInfiniteQuery({ limit: 4, id: userId });

  useEffect(() => {
    onTotalCountFetched(data.pages[0].totalCount);
  }, [data, onTotalCountFetched]);

  const isEmpty = data.pages[0].totalCount === 0;

  const navigate = useNavigate();
  const onClickMyEpigramList = () => {
    navigate(`/board`);
  };

  return (
    <div>
      {isEmpty ? (
        <div className='w-[312px] h-[304px] flex flex-col items-center justify-center gap-2 tablet:gap-4 desktop:gap-6 tablet:w-[384px] desktop:w-[640px] desktop:h-[488px]'>
          <img src={Search} alt='돋보기' className='desktop:w-[144px]' />
          <div className='flex flex-col items-center gap-8 text-sm font-normal tablet:gap-10 desktop:gap-12 desktop:text-xl'>
            <span className='flex flex-col items-center'>
              아직 작성한 댓글이 없어요! <p />
              댓글을 달고 다른 사람들과 교류해보세요.
            </span>
            <motion.button
              onClick={onClickMyEpigramList}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className='border-gray-100 rounded-[100px] border px-[18px] py-[12px] desktop:px-[20px] text-black-400 hover:bg-purple-200 hover:text-white focus:bg-purple-200 focus:text-white'
            >
              에피그램 둘러보기
            </motion.button>
          </div>
        </div>
      ) : (
        <SuspenseWrapper>
          <CommentList data={data} fetchNextPage={fetchNextPage} isFetching={isFetching} userId={userId} isInfiniteScroll={false} buttonText='최신 댓글 더보기' />
        </SuspenseWrapper>
      )}
    </div>
  );
};

export default MyCommentsList;
