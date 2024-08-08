import { useEffect, useState } from 'react';
import EpigramCard from './EpigramCard';
import ViewMore from './ViewMore';
import { useGetEpigrams } from '../hooks/useGetEpigrams';
import { EpigramListType } from '../schema/epigram/EpigramGet';
import { useQueryClient } from '@tanstack/react-query';

interface EpigramListProps {
  isWide?: boolean;
}

function EpigramList({ isWide = false }: EpigramListProps) {
  const LIMIT = !isWide ? 3 : 6;
  const [epigramList, setEpigramList] = useState<EpigramListType[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [limit, setLimit] = useState<number>(LIMIT);
  const [showButton, setShowButton] = useState(false);
  const { data, isLoading } = useGetEpigrams(limit, nextCursor);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (data) {
      const epigrams = data.list;
      setEpigramList((prev) => {
        const newList = [...prev, ...epigrams];
        setShowButton(!(data.totalCount == newList.length));
        return newList;
      });
    }
  }, [data]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ['epigrams', { cursor: nextCursor, limit: limit }] });
    };
  }, [queryClient, limit, nextCursor]);

  const handleClickViewMore = () => {
    if (!isWide) setLimit(5);
    if (data) {
      setNextCursor(data.nextCursor);
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