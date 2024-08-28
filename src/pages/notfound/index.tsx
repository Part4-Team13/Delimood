import { useNavigate } from 'react-router-dom';
import heart from '../../assets/ico_face_heart.svg';
import smiling from '../../assets/ico_face_smiling.svg';
import thinking from '../../assets/ico_face_thinking.svg';
import sad from '../../assets/ico_face_sad.svg';
import angry from '../../assets/ico_face_angry.svg';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-4 bg-white desktop:gap-12'>
      <div className='flex space-x-4'>
        <img src={heart} alt='Heart' className='w-12 bounce bounce-1 desktop:w-20' />
        <img src={smiling} alt='Smiling' className='w-12 bounce bounce-2 desktop:w-20' />
        <img src={thinking} alt='Thinking' className='w-12 bounce bounce-3 desktop:w-20' />
        <img src={sad} alt='Sad' className='w-12 bounce bounce-4 desktop:w-20' />
        <img src={angry} alt='Angry' className='w-12 bounce bounce-5 desktop:w-20' />
      </div>
      <div className='flex flex-col items-center justify-center desktop:gap-6'>
        <span className='text-4xl font-bold desktop:text-[70px]'>404 Not Found</span>
        <span className='text-lg desktop:text-xl'>찾으시는 페이지가 존재하지 않습니다.</span>
      </div>
      <button
        onClick={handleGoBack}
        className='border-gray-100 rounded-[100px] border px-[18px] py-[12px] desktop:text-xl desktop:px-[20px] text-black-400 hover:bg-yellow hover:text-white focus:bg-yellow focus:text-white'
      >
        이전 페이지로 돌아가기
      </button>
    </div>
  );
};

export default NotFound;
