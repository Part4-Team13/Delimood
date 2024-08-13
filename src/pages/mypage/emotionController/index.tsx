import EmotionCalendar from './EmotionCalendar';
import EmotionChart from './EmotionChart';

export default function EmotionController() {
  return (
    <div className='flex flex-col gap-8 justify-center items-center'>
      <EmotionCalendar />
      <EmotionChart />
    </div>
  );
}
