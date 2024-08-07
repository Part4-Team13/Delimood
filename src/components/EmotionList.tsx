import heart from '../assets/ico_face_heart.svg';
import smiling from '../assets/ico_face_smiling.svg';
import thinking from '../assets/ico_face_thinking.svg';
import sad from '../assets/ico_face_sad.svg';
import angry from '../assets/ico_face_angry.svg';
import { useState } from 'react';

const emotions = [
  { emotion: heart, describe: '감동', color: 'yellow' },
  { emotion: smiling, describe: '기쁨', color: 'green' },
  { emotion: thinking, describe: '고민', color: 'purple' },
  { emotion: sad, describe: '슬픔', color: 'blue' },
  { emotion: angry, describe: '분노', color: 'red' },
];

const colorMap: { [color: string]: string } = {
  yellow: 'border-yellow',
  green: 'border-green',
  purple: 'border-purple',
  blue: 'border-blue-default',
  red: 'border-red',
};

const getBorderClass = (color: string) => colorMap[color] || '';

interface EmotionCardProps {
  emotion: string;
  describe: string;
  color: string;
  isSelected: boolean;
  onClick: (color: string) => void;
}

const EmotionCard: React.FC<EmotionCardProps> = ({ emotion, describe, color, isSelected, onClick }) => {
  return (
    <div className='flex flex-col gap-[8px] items-center'>
      <button
        onClick={() => onClick(color)}
        className={`rounded-[16px] w-[56px] h-[56px] tablet:w-[64px] tablet:h-[64px] desktop:w-[96px] desktop:h-[96px] bg-line-darker relative cursor-pointer ${isSelected ? `border-[3px] bg-opacity-0 ${getBorderClass(color)}` : ''}`}
      >
        <img className='w-[32px] h-[32px] desktop:w-[48px] desktop:h-[48px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' src={emotion} alt={describe} />
      </button>
      <span className='text-xs tablet:text-lg desktop:text-xl'>{describe}</span>
    </div>
  );
};

function EmotionList() {
  const [selectexColor, setSelectedColor] = useState('');
  const emotionCardClick = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <ul className='flex gap-[16px]'>
      {emotions.map((emotion, index) => (
        <li key={index}>
          <EmotionCard emotion={emotion.emotion} describe={emotion.describe} color={emotion.color} isSelected={emotion.color === selectexColor} onClick={emotionCardClick} />
        </li>
      ))}
    </ul>
  );
}

export default EmotionList;
