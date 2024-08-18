import { useState } from 'react';
import dayjs from 'dayjs';
import EmotionCalendar from './EmotionCalendar';
import EmotionChart from './EmotionChart';
import { useGetMonthlyEmotionLogs } from '../../../hooks/useEmotionLogQuery';

const today = dayjs();
const initialYear = today.year();
const initialMonth = today.month() + 1;

export default function EmotionController() {
  const [year, setYear] = useState<number>(initialYear);
  const [month, setMonth] = useState<number>(initialMonth);
  const userId = 110;

  const { data, error, isLoading } = useGetMonthlyEmotionLogs({ userId, year, month });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const handleDateChange = (newYear: number, newMonth: number) => {
    setYear(newYear);
    setMonth(newMonth);
    console.log('Updated Year:', newYear, 'Updated Month:', newMonth);
  };

  return (
    <div className='flex flex-col justify-center items-center gap-14 tablet:gap-[60px] desktop:gap-[156px]'>
      <EmotionCalendar data={data || []} onDateChange={handleDateChange} />
      <EmotionChart data={data || []} />
    </div>
  );
}
