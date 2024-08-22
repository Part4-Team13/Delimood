import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import alertMessage from '../../utils/alertMessage';

export default function Mypage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');

    alertMessage({ title: '성공적으로 로그아웃되었습니다.', message: '다시 이용하시려면 로그인부탁드립니다.', color: 'teal' });

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
