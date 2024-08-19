import TodayEpigram from './TodayEpigram';
import EmotionList from '../../components/EmotionList';
import AllEpigramList from './allEpigramList';
import AllCommentList from './allCommentList';

export default function Epigrams() {
  return (
    <div className='mt-[32px] desktop:mt-[120px] flex flex-col items-center justify-center mb-[114px]'>
      <div className='flex flex-col gap-6 desktop:gap-10 w-[312px] tablet:w-[384px] desktop:w-[640px]'>
        <span className='w-full text-base font-semibold justify-items-start text-black-600 desktop:text-2xl'>오늘의 에피그램</span>
        <TodayEpigram />
      </div>
      <div className='flex flex-col gap-6 desktop:gap-10 w-[312px] tablet:w-[384px] desktop:w-[640px] mt-[56px] desktop:mt-[140px]'>
        <span className='w-full text-base font-semibold justify-items-start text-black-600 desktop:text-2xl'>오늘의 감정은 어떤가요?</span>
        <EmotionList />
      </div>
      <div className='flex flex-col gap-6 desktop:gap-10 w-[312px] tablet:w-[384px] desktop:w-[640px] mt-[56px] desktop:mt-[140px]'>
        <span className='w-full text-base font-semibold justify-items-start text-black-600 desktop:text-2xl'>최신 에피그램</span>
        <AllEpigramList />
      </div>
      <div className='flex flex-col gap-6 desktop:gap-10 w-[312px] tablet:w-[384px] desktop:w-[640px] mt-[56px] desktop:mt-[140px]'>
        <span className='w-full text-base font-semibold justify-items-start text-black-600 desktop:text-2xl'>최신 댓글</span>
        <AllCommentList />
      </div>
    </div>
  );
}
