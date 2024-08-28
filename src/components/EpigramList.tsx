import { useEffect, useState } from 'react';
import EpigramCard from './EpigramCard';
import ViewMore from './ViewMore';
import { GetEpigramListResponseType, GetEpigramListType } from '../schema/epigramSchema';
import { InfiniteData } from '@tanstack/react-query';

interface EpigramListProps {
  isWide?: boolean;
  data: InfiniteData<GetEpigramListResponseType>;
  isLoading: boolean;
  fetchNextPage: () => void;
  buttonText?: string;
}

function EpigramList({ isWide = false, data, isLoading, fetchNextPage, buttonText }: EpigramListProps) {
  const [epigramList, setEpigramList] = useState<GetEpigramListType[]>([]);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const allEpigrams = data.pages.flatMap((page) => page.list || []);
    setEpigramList(() => {
      data.pages[0].totalCount === allEpigrams.length ? setShowButton(false) : setShowButton(true);
      return allEpigrams;
    });
  }, [data, isLoading]);

  const handleClickViewMore = () => {
    fetchNextPage();
  };

  return (
    <div className='flex flex-col gap-[72px] mx-auto'>
      <ul
        className={`mx-auto min-w-[312px] max-w-fit grid ${isWide ? 'grid-cols-2 gap-y-[16px] gap-x-[8px] tablet:gap-y-[24px] tablet:gap-x-[12px] desktop:gap-y-[40px] desktop:gap-x-[20px]' : 'grid-cols-1 gap-[16px]'}`}
      >
        {epigramList.map((data) => (
          <li key={data.id}>
            <EpigramCard id={data.id} author={data.author} content={data.content} tags={data.tags} isSeperated={isWide} />
          </li>
        ))}
      </ul>
      {isLoading && (
        <div className='mx-auto'>
          <ViewMore text='로딩 중...' disabled={isLoading} />
        </div>
      )}
      {!isLoading && showButton && (
        <div className='mx-auto'>
          <ViewMore text={buttonText || (isWide ? '에피그램 더보기' : '더보기')} onClick={handleClickViewMore} disabled={isLoading} />
        </div>
      )}
    </div>
  );
}

export default EpigramList;
