import heart from '../assets/ico_face_heart.svg';
import smiling from '../assets/ico_face_smiling.svg';
import thinking from '../assets/ico_face_thinking.svg';
import sad from '../assets/ico_face_sad.svg';
import angry from '../assets/ico_face_angry.svg';
import { useState } from 'react';
import { usePostEmotionLog } from '../hooks/useEmotionLogQuery';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { rem } from '@mantine/core';

const emotions = [
  { icon: heart, describe: '감동', color: 'yellow', emotion: 'MOVED' },
  { icon: smiling, describe: '기쁨', color: 'green', emotion: 'HAPPY' },
  { icon: thinking, describe: '고민', color: 'purple', emotion: 'WORRIED' },
  { icon: sad, describe: '슬픔', color: 'blue', emotion: 'SAD' },
  { icon: angry, describe: '분노', color: 'red', emotion: 'ANGRY' },
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
  icon: string;
  describe: string;
  color: string;
  isSelected: boolean;
  onClick: (color: string) => void;
  emotion: string;
}

const EmotionCard: React.FC<EmotionCardProps> = ({ icon, describe, color, isSelected, onClick, emotion }) => {
  return (
    <div className='flex flex-col gap-[8px] items-center'>
      <button
        onClick={() => onClick(emotion)}
        className={`rounded-[16px] w-[56px] h-[56px] tablet:w-[64px] tablet:h-[64px] desktop:w-[96px] desktop:h-[96px] bg-[#AFBACD] relative cursor-pointer ${isSelected ? `border-[3px] bg-opacity-0 ${getBorderClass(color)}` : 'bg-opacity-[0.15]'}`}
      >
        <img className='w-[32px] h-[32px] desktop:w-[48px] desktop:h-[48px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' src={icon} alt={describe} />
      </button>
      <span className='text-xs tablet:text-lg desktop:text-xl'>{describe}</span>
    </div>
  );
};

function EmotionList() {
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const mutation = usePostEmotionLog({
    onError: () => {
      showNotification({
        title: '죄송합니다. 다시 시도해주세요.',
        message: '감정 등록에 실패했습니다.',
        icon: xIcon,
        color: 'red',
        autoClose: 2000,
        styles: () => ({
          root: {
            position: 'fixed',
            top: '10%',
            right: '3%',
            transform: 'translate(-50%, -50%)',
            minWidth: '300px',
            width: '40%',
            maxWidth: '70%',
          },
        }),
      });
    },
  });

  const emotionCardClick = (emotion: string) => {
    setSelectedEmotion(emotion);
    mutation.mutate({ emotion });
  };

  return (
    <ul className='flex gap-[16px]'>
      {emotions.map((emotion, index) => (
        <li key={index}>
          <EmotionCard icon={emotion.icon} describe={emotion.describe} color={emotion.color} isSelected={emotion.emotion === selectedEmotion} onClick={emotionCardClick} emotion={emotion.emotion} />
        </li>
      ))}
    </ul>
  );
}

export default EmotionList;
