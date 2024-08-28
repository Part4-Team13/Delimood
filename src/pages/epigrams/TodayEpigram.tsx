import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetTodayEpigramQuery } from '../../hooks/useEpigramQuery';
import EpigramCard from '../../components/EpigramCard';
import { motion } from 'framer-motion';

const TodayEpigram: React.FC = () => {
  const { data } = useGetTodayEpigramQuery();
  const navigate = useNavigate();
  const onClickMyEpigramList = () => {
    navigate(`/addepigram`);
  };

  //NOTE : 오늘 작성한 에피그램이 없을 경우에, data가 없어 204 No Content 상태.
  if (!data) {
    return (
      <div className='flex flex-col items-center justify-center w-full h-full '>
        오늘의 에피그램이 없습니다.
        <span>에피그럼을 작성하고 감정을 공유해보세요!</span>
        <motion.button
          onClick={onClickMyEpigramList}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className='border-gray-100 rounded-[100px] border px-[18px] py-[12px] desktop:px-[20px] text-black-400 hover:bg-purple-300 hover:text-white focus:bg-purple-300 focus:text-white mt-3'
        >
          에피그램 만들러 가기
        </motion.button>
      </div>
    );
  }

  return <EpigramCard id={data.id} author={data.author} content={data.content} tags={data.tags} isSeperated={false} />;
};

export default TodayEpigram;
