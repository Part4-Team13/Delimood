import heart from '../assets/ico_face_heart.svg';
import smiling from '../assets/ico_face_smiling.svg';
import thinking from '../assets/ico_face_thinking.svg';
import sad from '../assets/ico_face_sad.svg';
import angry from '../assets/ico_face_angry.svg';
import { useEffect, useState } from 'react';
import { usePostEmotionLog, useGetTodayEmotionLog } from '../hooks/useEmotionLogQuery';
import { useGetMeQuery } from '../hooks/useUserQuery';
import alertMessage from './AlertMessage';

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
  purple: 'border-purple-default',
  blue: 'border-blue-default',
  red: 'border-red',
};

const getBorderClass = (color: string) => colorMap[color] || '';

interface EmotionCardProps {
  icon: string;
  describe: string;
  color: string;
  isSelected: boolean;
  onClick: (emotion: string) => void;
  emotion: string;
}

const EmotionCard: React.FC<EmotionCardProps> = ({ icon, describe, color, isSelected, onClick, emotion }) => {
  return (
    <div className='flex flex-col gap-[8px] items-center'>
      <button
        onClick={() => onClick(emotion)}
        className={`rounded-[16px] w-[56px] h-[56px] tablet:w-[64px] tablet:h-[64px] desktop:w-[96px] desktop:h-[96px] bg-[#AFBACD] relative cursor-pointer ${
          isSelected ? `border-[3px] bg-opacity-0 desktop:border-[4px] ${getBorderClass(color)}` : 'bg-opacity-[0.15]'
        }`}
      >
        <img className='w-[32px] h-[32px] desktop:w-[48px] desktop:h-[48px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' src={icon} alt={describe} />
      </button>
      <span className='text-xs tablet:text-lg desktop:text-xl'>{describe}</span>
    </div>
  );
};

//NOTE:메인페이지에서 이모지를 선택하면 컴포넌트가 사라지고 다음날 나타나게 하는 옵션 추가
interface EmotionListProps {
  hideAfterPost?: boolean;
  onHide?: () => void;
}

function EmotionList({ hideAfterPost = false, onHide }: EmotionListProps) {
  const [selectedEmotion, setSelectedEmotion] = useState<string>('');
  const { data: userData, isLoading: userLoading } = useGetMeQuery();

  const [isHidden, setIsHidden] = useState(false);
  const mutation = usePostEmotionLog(
    { userId: userData?.id || 0, year: new Date().getFullYear(), month: new Date().getMonth() + 1 },
    {
      onError: () => {
        alertMessage({ title: '죄송합니다. 다시 시도해주세요.', message: '감정 등록에 실패했습니다.', color: 'red' });
      },
      onSuccess: () => {
        if (userData?.id) {
          refetch();
        }
      },
    },
  );

  const { data: todayEmotion, refetch } = useGetTodayEmotionLog(userData?.id ? { userId: userData.id } : { userId: 0 });

  // useEffect를 사용하여 userData가 존재할 때만 refetch를 호출하도록 설정.
  useEffect(() => {
    if (userData?.id) {
      refetch();
    }
  }, [userData, refetch]);

  useEffect(() => {
    if (todayEmotion) {
      setSelectedEmotion(todayEmotion.emotion);
    }
  }, [todayEmotion]);

  useEffect(() => {
    if (!hideAfterPost || !userData) return;

    const lastPostDateKey = `lastPostDate_${userData.id}`;
    const lastPostDate = localStorage.getItem(lastPostDateKey);
    const today = new Date().toISOString().split('T')[0];

    //NOTE:현재 날짜(today)와 lastPostDate를 비교해서 만약 이 값이 다르면(즉, 하루가 지났다면) 사용자는 다시 감정을 선택할 수 있음.
    if (lastPostDate === today) {
      setIsHidden(true);
      if (onHide) onHide();
    }
  }, [hideAfterPost, onHide, userData]);

  const emotionCardClick = (emotion: string) => {
    setSelectedEmotion(emotion);
    if (userData?.id) {
      mutation.mutate({ emotion });
    }

    if (hideAfterPost && userData) {
      const today = new Date().toISOString().split('T')[0];
      const lastPostDateKey = `lastPostDate_${userData.id}`;
      localStorage.setItem(lastPostDateKey, today);
      setIsHidden(true);
      if (onHide) onHide();
    }
  };

  if (isHidden) {
    return null;
  }

  if (userLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ul className='flex gap-[16px] items-center justify-center'>
      {emotions.map((emotion, index) => (
        <li key={index}>
          <EmotionCard icon={emotion.icon} describe={emotion.describe} color={emotion.color} isSelected={emotion.emotion === selectedEmotion} onClick={emotionCardClick} emotion={emotion.emotion} />
        </li>
      ))}
    </ul>
  );
}

export default EmotionList;
