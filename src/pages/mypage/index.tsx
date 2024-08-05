import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { rem } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

export default function Mypage() {
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');

    showNotification({
      title: '로그아웃',
      message: '성공적으로 로그아웃되었습니다.',
      icon: checkIcon,
      color: 'teal',
    });

    navigate('/login');
  };

  return (
    <div>
      <p>여기는 마이 페이지입니다.</p>
      <button onClick={handleLogout} className='h-[40px] w-[200px] bg-blue-default rounded-lg text-white'>
        로그아웃
      </button>
    </div>
  );
}
