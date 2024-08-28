import heart from '../assets/ico_face_heart.svg';
import smiling from '../assets/ico_face_smiling.svg';
import thinking from '../assets/ico_face_thinking.svg';
import sad from '../assets/ico_face_sad.svg';
import angry from '../assets/ico_face_angry.svg';
import { useCallback, useEffect, useState } from 'react';
import { usePostEmotionLog, useGetTodayEmotionLog } from '../hooks/useEmotionLogQuery';
import { useGetMeQuery } from '../hooks/useUserQuery';
import alertMessage from './AlertMessage';
import AlertEmotion from '../pages/epigrams/AlertEmotion';

const EMOTIONS = [
  { icon: heart, describe: '감동', color: 'yellow', emotion: 'MOVED', message: '특별한 감동이었기를 바랍니다. 그 순간이 마음에 오래 남길 바랍니다.' },
  { icon: smiling, describe: '기쁨', color: 'green', emotion: 'HAPPY', message: '하루 동안 기쁨이 당신을 가득 채웠기를 바랍니다. 그 순간이 오래 기억되기를 바랍니다.' },
  { icon: thinking, describe: '고민', color: 'purple', emotion: 'WORRIED', message: '현재의 고민에 해결의 실마리를 찾기를 바랍니다. 그 과정이 순조롭기를 바랍니다.' },
  { icon: sad, describe: '슬픔', color: 'blue', emotion: 'SAD', message: '오늘의 슬픔이 조금이나마 치유되고, 행복한 바람이 불어오기를 바랍니다.' },
  { icon: angry, describe: '분노', color: 'red', emotion: 'ANGRY', message: '오늘의 화가 나는 일이 하나의 희미한 먼지처럼 기억되기를 바랍니다. 편안해지기를 바랍니다.' },
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
  autoClose?: number | false;
}

function EmotionList({ hideAfterPost = false, onHide, autoClose = 3000 }: EmotionListProps) {
  const { data: userData } = useGetMeQuery();

  const [isHidden, setIsHidden] = useState(false);

  const mutation = usePostEmotionLog(
    { userId: userData.id, year: new Date().getFullYear(), month: new Date().getMonth() + 1 },
    {
      onError: () => {
        alertMessage({ title: '죄송합니다. 다시 시도해주세요.', message: '감정 등록에 실패했습니다.', color: 'red' });
      },
    },
  );

  const { data: todayEmotion } = useGetTodayEmotionLog({ userId: userData.id });

  const isSelected = useCallback(
    (emotionVal: string) => {
      const emotionToCompare = todayEmotion?.emotion;
      return emotionVal === emotionToCompare;
    },
    [todayEmotion?.emotion],
  );

  //NOTE:에피그램 페이지에서 감정 등록 후 컴포넌트 숨기기
  useEffect(() => {
    if (!hideAfterPost) return;

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
    const selectedEmotion = EMOTIONS.find((e) => e.emotion === emotion);

    if (selectedEmotion) {
      AlertEmotion({
        title: `오늘의 감정은 "${selectedEmotion.describe}" 으로 저장됩니다`,
        message: selectedEmotion.message,
        color: selectedEmotion.color,
        icon: selectedEmotion.icon,
        autoClose,
      });
    }

    mutation.mutate({ emotion });

    if (hideAfterPost) {
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

  return (
    <ul className='flex gap-[16px] items-center justify-center'>
      {EMOTIONS.map((emotion, index) => (
        <li key={index}>
          <EmotionCard icon={emotion.icon} describe={emotion.describe} color={emotion.color} isSelected={isSelected(emotion.emotion)} onClick={emotionCardClick} emotion={emotion.emotion} />
        </li>
      ))}
    </ul>
  );
}

export default EmotionList;
