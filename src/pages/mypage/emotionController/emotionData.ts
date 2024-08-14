import heart from '../../../assets/ico_face_heart.svg';
import smiling from '../../../assets/ico_face_smiling.svg';
import thinking from '../../../assets/ico_face_thinking.svg';
import sad from '../../../assets/ico_face_sad.svg';
import angry from '../../../assets/ico_face_angry.svg';

export const emotionIcons: Record<string, string> = {
  HAPPY: smiling,
  ANGRY: angry,
  THINKING: thinking,
  SAD: sad,
  MOVED: heart,
};

export const emotionNames: Record<string, string> = {
  HAPPY: '기쁨',
  ANGRY: '분노',
  THINKING: '고민',
  SAD: '슬픔',
  MOVED: '감동',
};
