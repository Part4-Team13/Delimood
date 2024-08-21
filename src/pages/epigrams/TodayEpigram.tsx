import React from 'react';
import { useGetTodayEpigramQuery } from '../../hooks/useEpigramQuery';
import EpigramCard from '../../components/EpigramCard';

const TodayEpigram: React.FC = () => {
  const { data, isLoading, isError } = useGetTodayEpigramQuery();

  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  if (isError) {
    return <div>에러가 발생했습니다. 다시 시도해 주세요.</div>;
  }

  if (data) {
    return <EpigramCard id={data.id} author={data.author} content={data.content} tags={data.tags} isSeperated={false} />;
  }

  return <div>오늘의 에피그램이 없습니다.</div>;
};

export default TodayEpigram;
