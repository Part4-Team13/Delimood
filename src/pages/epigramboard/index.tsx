import EpigramList from '../../components/EpigramList';
import { useGetEpigramListInfiniteQuery } from '../../hooks/useEpigramQuery';

export default function EpigramBoard() {
  const { data, fetchNextPage, isLoading } = useGetEpigramListInfiniteQuery({ limit: 6 });

  return (
    <>
      <div className='text-lg desktop:text-2xl mt-[32px] desktop:mt-[120px] w-[312px] tablet:w-[600px] desktop:w-[1200px] mx-auto'>피드</div>
      <div className='mt-[40px] mb-[114px]'>
        <EpigramList data={data} fetchNextPage={fetchNextPage} isLoading={isLoading} isWide />
      </div>
    </>
  );
}
