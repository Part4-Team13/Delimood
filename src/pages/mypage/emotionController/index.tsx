import EmotionCalendar from './EmotionCalendar';
import EmotionChart from './EmotionChart';

export default function EmotionController() {
  return (
    <div className='flex flex-col justify-center items-center gap-14 tablet:gap-[60px] desktop:gap-[156px]'>
      <EmotionCalendar />
      <EmotionChart />
    </div>
  );
}
