import TodayEpigram from './TodayEpigram';

export default function Epigrams() {
  return (
    <div className='mt-[32px] desktop:mt-[120px] flex flex-col items-center justify-center'>
      <div className='flex flex-col gap-6 desktop:gap-10 w-[312px] tablet:w-[384px] desktop:w-[640px]'>
        <span className='w-full text-base font-semibold justify-items-start text-black-600 desktop:text-2xl'>오늘의 에피그램</span>
        <TodayEpigram />
      </div>
    </div>
  );
}
