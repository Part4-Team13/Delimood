import React from 'react';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/ico_logo.svg';
import menu from '../assets/ico_gnb_menu.svg';

const mockUser = {
  image: 'https://picsum.photos/200/300',
  nickname: '김코드',
  id: 1,
};

interface HeaderButtonsProps {
  user?: { image: string; nickname: string; id: number };
  pathNow: string;
  navigate: NavigateFunction;
}

const gnbMenu: { name: string; path: string }[] = [
  { name: '피드', path: '/epigrams' },
  { name: '검색', path: 'search' },
];

const HeaderLeft: React.FC<HeaderButtonsProps> = ({ pathNow, navigate }) => {
  switch (pathNow) {
    case '/':
    case '/login':
    case '/signup':
      return;
    default:
      return (
        <ul className='flex items-center gap-[12px] tablet:gap-[24px] desktop:gap-[36px] mr-auto cursor-pointer'>
          <li onClick={() => navigate('/')} className='mr-[12px] w-[101px] desktop:w-[131px]'>
            <img src={logo} alt='메인 페이지로' />
          </li>
          <li>
            <ul className=' hidden tablet:flex gap-[24px] items-center text-lg'>
              {gnbMenu.map((menu, index) => (
                <li key={index} onClick={() => navigate(menu.path)}>
                  {menu.name}
                </li>
              ))}
            </ul>
          </li>
          <li onClick={() => {}} className='inline tablet:hidden order-first cursor-pointer'>
            <img src={menu} alt='더보기메뉴' />
          </li>
        </ul>
      );
  }
};

const HeaderMiddle: React.FC<HeaderButtonsProps> = ({ pathNow, navigate }) => {
  switch (pathNow) {
    case '/':
    case '/login':
    case '/signup':
      return (
        <button className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' onClick={() => navigate('/')}>
          <img src={logo} alt='메인 페이지로' className='w-[101px] desktop:w-[130px]' />
        </button>
      );
    default:
      return;
  }
};

const HeaderRight: React.FC<HeaderButtonsProps> = ({ pathNow, user, navigate }) => {
  if (user) {
    return (
      <button className='flex items-center gap-[6px] ml-auto' onClick={() => navigate('/mypage')}>
        <img className='w-[25px] h-[25px] tablet:w-[30px] tablet:h-[30px] object-cover rounded-full' src={user.image} alt={pathNow} />
        <span className='hidden tablet:inline'>{user.nickname}</span>
      </button>
    );
  } else {
    switch (pathNow) {
      case '/login':
        return;
      default:
        return (
          <span className='cursor-pointer text-md tablet:text-lg ml-auto' onClick={() => navigate('/login')}>
            로그인
          </span>
        );
    }
  }
};

function Header() {
  const { pathname: pathNow } = useLocation();
  const navigate = useNavigate();

  return (
    <div className='bg-white flex h-[52px] px-[24px] tablet:h-[60px] tablet:px-[72px] desktop:px-[120px] desktop:h-[80px] items-center relative'>
      <HeaderLeft pathNow={pathNow} navigate={navigate} />
      <HeaderMiddle pathNow={pathNow} navigate={navigate} />
      <HeaderRight pathNow={pathNow} user={mockUser} navigate={navigate} />
    </div>
  );
}

export default Header;
