import React, { useEffect } from 'react';
import EpigramList from '../../components/EpigramList';
import { useGetEpigramListInfiniteQuery } from '../../hooks/useEpigramQuery';

interface MyEpigramListProps {
  userId: number;
  onTotalCountFetched: (totalCount: number) => void;
}

const MyEpigramList: React.FC<MyEpigramListProps> = ({ userId, onTotalCountFetched }) => {
  const { data, fetchNextPage, isFetching } = useGetEpigramListInfiniteQuery({ limit: 3, writerId: userId });

  useEffect(() => {
    if (data?.pages?.[0]?.totalCount !== undefined) {
      onTotalCountFetched(data.pages[0].totalCount);
    }
  }, [data, onTotalCountFetched]);

  return <EpigramList data={data} fetchNextPage={fetchNextPage} isLoading={isFetching} isWide={false} />;
};

export default MyEpigramList;
