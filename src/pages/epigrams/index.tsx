import React, { ReactNode } from 'react';
import TodayEpigram from './TodayEpigram';
import EmotionList from '../../components/EmotionList';
import AllEpigramList from './allEpigramList';
import AllCommentList from './allCommentList';

export default function Epigrams() {
  type SectionProps = {
    title: string;
    children: ReactNode;
    className?: string;
  };

  const Section: React.FC<SectionProps> = ({ title, children, className }) => {
    return (
      <div className={`flex flex-col gap-6 desktop:gap-10 w-[312px] tablet:w-[384px] desktop:w-[640px] ${className}`}>
        <span className='w-full text-base font-semibold justify-items-start text-black-600 desktop:text-2xl'>{title}</span>
        {children}
      </div>
    );
  };

  return (
    <div className='mt-[32px] desktop:mt-[120px] flex flex-col items-center justify-center mb-[114px]'>
      <Section title='오늘의 에피그램'>
        <TodayEpigram />
      </Section>
      <Section title='오늘의 감정은 어떤가요?' className='mt-[56px] desktop:mt-[140px]'>
        <EmotionList />
      </Section>
      <Section title='최신 에피그램' className='mt-[56px] desktop:mt-[140px]'>
        <AllEpigramList />
      </Section>
      <Section title='최신 댓글' className='mt-[56px] desktop:mt-[140px]'>
        <AllCommentList />
      </Section>
    </div>
  );
}
