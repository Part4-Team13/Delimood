import EpigramList from '../../components/EpigramList';
import { useGetEpigramListInfiniteQuery } from '../../hooks/useEpigramQuery';

export default function AllEpigramList() {
  const { data, fetchNextPage, isFetching } = useGetEpigramListInfiniteQuery({ limit: 3 });

  return <EpigramList data={data} fetchNextPage={fetchNextPage} isLoading={isFetching} isWide={false} buttonText='에피그램 더보기' />;
}
