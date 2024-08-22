import { useState, useEffect } from 'react';
import { DonutChart } from '@mantine/charts';
import { emotionColors, emotionIcons, emotionNames } from './emotionData';

interface EmotionData {
  id: number;
  userId: number;
  emotion: keyof typeof emotionColors;
  createdAt: string;
}

interface ProcessedEmotionData {
  name: string;
  value: number;
  color: string;
}

//NOTE : 감정 데이터를 처리하여 도넛 차트에 필요한 형식으로 변환하는 함수
function processEmotionData(data: EmotionData[]): ProcessedEmotionData[] {
  if (!data || data.length === 0) return [];

  const total = data.length;

  const emotionCounts = data.reduce<Record<string, number>>((acc, entry) => {
    acc[entry.emotion] = (acc[entry.emotion] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(emotionCounts)
    .map(([emotion, count]) => ({
      name: emotion,
      value: (count / total) * 100,
      color: emotionColors[emotion],
    }))
    .sort((a, b) => b.value - a.value);
}

//NOTE : 감정의 비율을 리스트로 표시하는 컴포넌트
function EmotionList({ data }: { data: ProcessedEmotionData[] }) {
  const topEmotionName = data[0].name;

  return (
    <div className='flex flex-col gap-2 desktop:gap-3.5'>
      {data.map((item) => (
        <div key={item.name} className='flex items-center gap-2 desktop:gap-4'>
          <div className='flex items-center justify-center w-2 h-2 rounded-sm desktop:w-4 desktop:h-4' style={{ backgroundColor: item.color }} />
          <img src={emotionIcons[item.name]} alt={emotionNames[item.name]} className='w-4 h-4 desktop:w-6 desktop:h-6' />
          <span className={`text-xs font-semibold desktop:text-xl ${item.name === topEmotionName ? 'text-black-600' : 'text-gray-200'}`}>{item.value.toFixed(0)}%</span>
        </div>
      ))}
    </div>
  );
}

export default function EmotionChart({ data }: { data: EmotionData[] }) {
  const processedData = processEmotionData(data);
  const hasData = processedData.length > 0;
  const topEmotion = hasData ? processedData[0] : null;

  const [chartSize, setChartSize] = useState(120);
  const [chartThick, setChartThink] = useState(7);

  useEffect(() => {
    const updateChart = () => {
      if (window.innerWidth >= 1280) {
        setChartSize(180);
        setChartThink(9);
      } else {
        setChartSize(120);
        setChartThink(7);
      }
    };

    updateChart();
    window.addEventListener('resize', updateChart);

    return () => {
      window.removeEventListener('resize', updateChart);
    };
  }, []);

  const placeholderData = [{ name: 'No Data', value: 100, color: '#e0e0e0' }];

  return (
    <div className='w-[312px] tablet:w-[384px] flex flex-col gap-[16px] desktop:w-[640px] desktop:gap-[48px] mb-[40px] tablet:mb-[63px] desktop:mb-[104px]'>
      <h2 className='text-base font-semibold text-black-600 desktop:text-2xl'>감정 차트</h2>
      <div className='flex gap-[48px] rounded-lg border border-line-bright tablet:gap-[76px] h-[176px] desktop:h-[264px] justify-center items-center desktop:gap-[120px]'>
        <div className='relative'>
          <DonutChart paddingAngle={2} size={chartSize} thickness={chartThick} data={hasData ? processedData : placeholderData} withTooltip={false} />
          {topEmotion ? (
            <div className='absolute inset-0 flex flex-col items-center justify-center text-center'>
              <img src={emotionIcons[topEmotion.name]} alt={emotionNames[topEmotion.name]} className='w-6 h-6 desktop:w-10 desktop:h-10' />
              <span className='text-base font-bold'>{emotionNames[topEmotion.name]}</span>
            </div>
          ) : (
            <div className='absolute inset-0 flex items-center justify-center text-center'>
              <span className='text-sm text-gray-400'>No Data</span>
            </div>
          )}
        </div>
        {hasData ? <EmotionList data={processedData} /> : <div className='-ml-5'>이모지 데이터가 없음</div>}
      </div>
    </div>
  );
}
