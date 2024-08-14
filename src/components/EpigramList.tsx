import { useEffect, useState } from 'react';
import EpigramCard from './EpigramCard';
import ViewMore from './ViewMore';
import { useGetEpigramListInfiniteQuery } from '../hooks/useEpigramQuery';
import { GetEpigramListType } from '../schema/epigramSchema';

interface EpigramListProps {
  isWide?: boolean;
}

function EpigramList({ isWide = false }: EpigramListProps) {
  const LIMIT = !isWide ? 3 : 6;
  const [epigramList, setEpigramList] = useState<GetEpigramListType[]>([]);
  const [limit, setLimit] = useState<number>(LIMIT);
  const [showButton, setShowButton] = useState(false);
  const { data, isLoading, fetchNextPage } = useGetEpigramListInfiniteQuery({ limit });

  useEffect(() => {
    if (data) {
      const allEpigrams = data.pages.flatMap((page) => page.list || []);
      setEpigramList(() => {
        data.pages[0].totalCount === allEpigrams.length ? setShowButton(false) : setShowButton(true);
        return allEpigrams;
      });
    }
  }, [data]);

  const handleClickViewMore = () => {
    if (!isWide) setLimit(5);
    if (data) {
      fetchNextPage();
    }
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
          <ViewMore text={isWide ? '에피그램 더보기' : '더보기'} onClick={handleClickViewMore} disabled={isLoading} />
        </div>
      )}
    </div>
  );
}

export default EpigramList;
