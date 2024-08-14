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

const emotionNames: Record<string, string> = {
  HAPPY: '기쁨',
  ANGRY: '분노',
  THINKING: '고민',
  SAD: '슬픔',
  MOVED: '감동',
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
    SAD: '#5195EE',
    THINKING: '#8E80E3',
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

export default function EmotionChart() {
  const data = processEmotionData(rawData);
  const topEmotion = data[0];

  return (
    <div className='w-[312px] tablet:w-[384px] flex flex-col gap-[16px] desktop:w-[640px] desktop:gap-[48px] '>
      <h2 className='text-base font-semibold text-black-600 desktop:text-2xl'>감정 차트</h2>
      <div className='flex gap-[48px] rounded-lg border border-line-bright tablet:gap-[76px] h-[176px] desktop:h-[264px] justify-center items-center desktop:gap-[120px]'>
        <div className='relative'>
          <div className='block desktop:hidden'>
            <DonutChart paddingAngle={2} size={120} thickness={7} data={data} withTooltip={false} />
          </div>
          <div className='hidden desktop:block'>
            <DonutChart paddingAngle={2} size={180} thickness={10} data={data} withTooltip={false} />
          </div>
          {topEmotion && (
            <div className='absolute inset-0 flex flex-col items-center justify-center text-center'>
              <img src={emotionIcons[topEmotion.name]} alt={emotionNames[topEmotion.name]} className='w-6 h-6 desktop:w-10 desktop:h-10' />
              <span className='text-base font-bold'>{emotionNames[topEmotion.name]}</span>
            </div>
          )}
        </div>
        <EmotionList data={data} />
      </div>
    </div>
  );
}
