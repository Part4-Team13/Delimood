import React, { useEffect } from 'react';
import EpigramList from '../../components/EpigramList';
import { useNavigate } from 'react-router-dom';
import { useGetEpigramListInfiniteQuery } from '../../hooks/useEpigramQuery';
import Search from '../../assets/ico_mypage_search.svg';

interface MyEpigramListProps {
  userId: number;
  onTotalCountFetched: (totalCount: number) => void;
}

//내 에피그램 리스트를 보여주는 컴포넌트
const MyEpigramList: React.FC<MyEpigramListProps> = ({ userId, onTotalCountFetched }) => {
  const { data, fetchNextPage, isFetching } = useGetEpigramListInfiniteQuery({ limit: 3, writerId: userId });

  useEffect(() => {
    if (data?.pages?.[0]?.totalCount !== undefined) {
      onTotalCountFetched(data.pages[0].totalCount);
    }
  }, [data, onTotalCountFetched]);

  const isEmpty = data?.pages?.[0]?.totalCount === 0;

  const navigate = useNavigate();
  const onClickMyEpigramList = () => {
    navigate(`/addepigram`);
  };

  return (
    <div>
      {isEmpty ? (
        <div className='w-[312px] h-[304px] flex flex-col items-center justify-center gap-2 tablet:gap-4 desktop:gap-6 tablet:w-[384px] desktop:w-[640px] desktop:h-[488px]'>
          <img src={Search} alt='돋보기' className='desktop:w-[144px]' />
          <div className='flex-col flex items-center gap-8 tablet:gap-10 desktop:gap-12 text-sm font-normal desktop:text-xl'>
            <span className='flex-col flex items-center'>
              아직 작성한 에피그램이 없어요! <p />
              에피그램을 작성하고 감정을 공유해보세요.
            </span>
            <button
              onClick={onClickMyEpigramList}
              className='border-gray-100 rounded-[100px] border px-[18px] py-[12px] desktop:px-[20px] text-black-400 hover:bg-black-950 hover:text-white focus:bg-black-950 focus:text-white'
            >
              에피그램 만들기
            </button>
          </div>
        </div>
      ) : (
        <EpigramList data={data} fetchNextPage={fetchNextPage} isLoading={isFetching} isWide={false} />
      )}
    </div>
  );
};

export default MyEpigramList;
