import { DonutChart } from '@mantine/charts';
import { rawData } from './data';

import heart from '../../../assets/ico_face_heart.svg';
import smiling from '../../../assets/ico_face_smiling.svg';
import thinking from '../../../assets/ico_face_thinking.svg';
import sad from '../../../assets/ico_face_sad.svg';
import angry from '../../../assets/ico_face_angry.svg';

const emotionIcons: Record<string, string> = {
  HAPPY: smiling,
  ANGRY: angry,
  THINKING: thinking,
  SAD: sad,
  MOVED: heart,
};

function processEmotionData(data: typeof rawData) {
  const total = data.length;
  const emotionCounts = data.reduce<Record<string, number>>((acc, entry) => {
    acc[entry.emotion] = (acc[entry.emotion] || 0) + 1;
    return acc;
  }, {});

  const emotionColors: Record<string, string> = {
    HAPPY: '#48BB98',
    ANGRY: '#F05650',
    SAD: 'indigo',
    THINKING: 'gray',
    MOVED: '#FBC85B',
  };

  return Object.entries(emotionCounts)
    .map(([emotion, count]) => ({
      name: emotion,
      value: (count / total) * 100,
      color: emotionColors[emotion],
    }))
    .sort((a, b) => b.value - a.value);
}

function EmotionList({ data }: { data: ReturnType<typeof processEmotionData> }) {
  return (
    <div className='flex flex-col space-y-2'>
      {data.map((item) => (
        <div key={item.name} className='flex items-center space-x-2'>
          <div className='flex items-center justify-center w-2 h-2 rounded-sm desktop:w-4 desktop:h-4' style={{ backgroundColor: item.color }} />
          <img src={emotionIcons[item.name]} alt={item.name} className='w-4 h-4 desktop:w-6 desktop:h-6' />
          <span>{item.value.toFixed(0)}%</span>
        </div>
      ))}
    </div>
  );
}

export default function EmotionChart() {
  const data = processEmotionData(rawData);
  const topEmotion = data[0];

  return (
    <div className='w-[312px] tablet:w-[384px] flex flex-col gap-[16px] desktop:w-[640px] desktop:gap-[48px]'>
      <h2 className='text-base font-semibold text-black-600 desktop:text-2xl'>감정 차트</h2>
      <div className='flex gap-[48px] rounded-lg border border-line-bright tablet:gap-[76px] h-[176px] justify-center items-center desktop:gap-[120px]'>
        <div className='relative'>
          <DonutChart paddingAngle={2} size={120} thickness={7} data={data} withTooltip={false} />
          {topEmotion && (
            <div className='absolute inset-0 flex flex-col items-center justify-center text-center'>
              <img src={emotionIcons[topEmotion.name]} alt={topEmotion.name} className='w-6 h-6' />
              <span>{topEmotion.name}</span>
            </div>
          )}
        </div>
        <EmotionList data={data} />
      </div>
    </div>
  );
}
