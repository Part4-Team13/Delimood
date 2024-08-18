import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { rem } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import EmotionController from './emotionController';
import dayjs from 'dayjs';
import UserProfile from './UserProfile';

export default function Mypage() {
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;
  const navigate = useNavigate();
  const today = dayjs().format('YYYY.MM.DD');

  const handleLogout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');

    showNotification({
      title: '성공적으로 로그아웃되었습니다.',
      message: '다시 이용하시려면 로그인부탁드립니다.',
      icon: checkIcon,
      color: 'teal',
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

    navigate('/login');
  };

  return (
    <div>
      <div className='flex flex-col items-center justify-center bg-white mt-[64px] desktop:mt-[128px] shadow-mypage rounded-[24px] mb-[40px]'>
        <UserProfile />
        <button
          onClick={handleLogout}
          className='h-[36px] w-[77px] desktop:h-[48px] desktop:w-[100px] desktop:text-xl mb-[56px] mt-[16px] desktop:mt-[24px] desktop:mb-[96px] rounded-[100px] text-sm font-normal bg-line-bright text-gray-300 '
        >
          로그아웃
        </button>
        <div className='w-[312px] tablet:w-[384px] desktop:w-[640px] flex justify-between'>
          <h2 className='text-base font-semibold text-black-600 desktop:text-2xl'>오늘의 감정</h2>
          <span className='mr-2 text-base font-normal text-blue-400 tablet:mr-4 desktop:text-xl'>{today}</span>
        </div>
        <EmotionController />
      </div>
    </div>
  );
}
