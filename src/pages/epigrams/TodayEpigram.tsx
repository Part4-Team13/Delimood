import React from 'react';
import { useGetTodayEpigramQuery } from '../../hooks/useEpigramQuery';
import EpigramCard from '../../components/EpigramCard';

const TodayEpigram: React.FC = () => {
  const { data } = useGetTodayEpigramQuery();

  return <EpigramCard id={data.id} author={data.author} content={data.content} tags={data.tags} isSeperated={false} />;

  //오늘 작성한 에피그램이 없을 경우에,
  //return <div>오늘의 에피그램이 없습니다.</div>;
};

export default TodayEpigram;
