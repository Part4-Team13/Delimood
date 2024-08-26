import { useState } from 'react';
import dayjs from 'dayjs';
import EmotionCalendar from './EmotionCalendar';
import EmotionChart from './EmotionChart';
import { useGetMonthlyEmotionLogs } from '../../../hooks/useEmotionLogQuery';
import { useGetMeQuery } from '../../../hooks/useUserQuery';
import SuspenseWrapper from '../../../components/SuspenseWrapper';

const today = dayjs();
const initialYear = today.year();
const initialMonth = today.month() + 1;

export default function EmotionController() {
  const [year, setYear] = useState<number>(initialYear);
  const [month, setMonth] = useState<number>(initialMonth);
  const { data: userData } = useGetMeQuery();

  const userId = userData?.id;

  const { data } = useGetMonthlyEmotionLogs({ userId: userId || 0, year, month });

  const handleDateChange = (newYear: number, newMonth: number) => {
    setYear(newYear);
    setMonth(newMonth);
  };

  return (
    <SuspenseWrapper>
      <div className='flex flex-col justify-center items-center gap-14 tablet:gap-[60px] desktop:gap-[156px]'>
        <EmotionCalendar data={data || []} year={year} month={month} onDateChange={handleDateChange} />
        <EmotionChart data={data || []} />
      </div>
    </SuspenseWrapper>
  );
}
