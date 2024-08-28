import React, { PropsWithChildren, useState } from 'react';
import TodayEpigram from './TodayEpigram';
import EmotionList from '../../components/EmotionList';
import AllEpigramList from './allEpigramList';
import AllCommentList from './allCommentList';
import FixedButton from '../../components/FixedButton';
import SuspenseWrapper from '../../components/SuspenseWrapper';

interface SectionProps extends PropsWithChildren {
  title: string;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ title, children, className }) => {
  return (
    <div className={`flex flex-col gap-6 desktop:gap-10 w-[312px] tablet:w-[384px] desktop:w-[640px] ${className}`}>
      <span className='w-full text-base font-semibold justify-items-start text-black-600 desktop:text-2xl'>{title}</span>
      {children}
    </div>
  );
};

export default function Epigrams() {
  const [isEmotionSectionVisible, setIsEmotionSectionVisible] = useState(true);

  return (
    <>
      <div className='mt-[32px] desktop:mt-[120px] flex flex-col items-center justify-center mb-[114px]'>
        <Section title='오늘의 에피그램'>
          <SuspenseWrapper>
            <TodayEpigram />
          </SuspenseWrapper>
        </Section>
        {isEmotionSectionVisible && (
          <Section title='오늘의 감정은 어떤가요?' className='mt-[56px] desktop:mt-[140px]'>
            <EmotionList hideAfterPost={true} onHide={() => setIsEmotionSectionVisible(false)} autoClose={false} />
          </Section>
        )}
        <Section title='최신 에피그램' className='mt-[56px] desktop:mt-[140px]'>
          <AllEpigramList />
        </Section>
        <Section title='최신 댓글' className='mt-[56px] desktop:mt-[140px]'>
          <SuspenseWrapper>
            <AllCommentList />
          </SuspenseWrapper>
        </Section>
        <FixedButton />
      </div>
    </>
  );
}
