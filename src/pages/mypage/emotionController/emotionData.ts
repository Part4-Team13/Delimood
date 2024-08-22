import heart from '../../../assets/ico_face_heart.svg';
import smiling from '../../../assets/ico_face_smiling.svg';
import thinking from '../../../assets/ico_face_thinking.svg';
import sad from '../../../assets/ico_face_sad.svg';
import angry from '../../../assets/ico_face_angry.svg';

//NOTE : 감정 데이터 관련 설정
export const emotionColors: Record<string, string> = {
  HAPPY: '#48BB98',
  ANGRY: '#F05650',
  SAD: '#5195EE',
  WORRIED: '#8E80E3',
  MOVED: '#FBC85B',
};

export const emotionIcons: Record<string, string> = {
  HAPPY: smiling,
  ANGRY: angry,
  WORRIED: thinking,
  SAD: sad,
  MOVED: heart,
};

export const emotionNames: Record<string, string> = {
  HAPPY: '기쁨',
  ANGRY: '분노',
  WORRIED: '고민',
  SAD: '슬픔',
  MOVED: '감동',
};
