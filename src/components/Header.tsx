import React, { useEffect } from 'react';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/ico_logo.svg';
import menu from '../assets/ico_gnb_menu.svg';
import { useDisclosure } from '@mantine/hooks';
import { Drawer } from '@mantine/core';

interface User {
  image: string;
  nickname: string;
  id: number;
}

interface HeaderProps {
  user?: User;
}

interface HeaderButtonsProps {
  user?: User;
  pathNow: string;
  navigate: NavigateFunction;
}

const mockUser = {
  image: 'https://picsum.photos/200/300',
  nickname: '김코드',
  id: 1,
};

// 헤더 좌측 버튼
const HeaderLeft: React.FC<HeaderButtonsProps> = ({ pathNow, navigate }) => {
  const [opened, { open: drawerOpen, close: drawerClose }] = useDisclosure(false);
  useEffect(() => {
    drawerClose();
  }, [drawerClose, pathNow]);

  const MenuItems: { name: string; path: string }[] = [
    { name: '피드', path: '/epigrams' },
    { name: '검색', path: 'search' },
  ];

  if (['/', '/login', 'signup'].includes(pathNow)) return null;

  return (
    <>
      <Drawer opened={opened} onClose={drawerClose} radius='md' padding='md'>
        <ul className='flex flex-col'>
          {MenuItems.map((menu, index) => (
            <li className='cursor-pointer py-[10px] text-lg' key={index} onClick={() => navigate(menu.path)}>
              {menu.name}
            </li>
          ))}
        </ul>
      </Drawer>

      <ul className='flex items-center gap-[12px] tablet:gap-[24px] desktop:gap-[36px] mr-auto cursor-pointer'>
        <li onClick={() => navigate('/')} className='w-[101px] desktop:w-[131px] h-[24px] tablet:h-[26px] desktop:h-[36px]'>
          <button className='mr-[12px] w-full h-full'>
            <img src={logo} alt='메인 페이지로' />
          </button>
        </li>
        <li>
          <ul className='hidden tablet:flex gap-[24px] items-center text-lg'>
            {MenuItems.map((menu, index) => (
              <li key={index} onClick={() => navigate(menu.path)}>
                <button>{menu.name}</button>
              </li>
            ))}
          </ul>
        </li>
        <li className='inline h-[24px] tablet:hidden order-first cursor-pointer'>
          <button onClick={drawerOpen}>
            <img src={menu} alt='더보기메뉴' />
          </button>
        </li>
      </ul>
    </>
  );
};

// 헤더 가운데 버튼
const HeaderMiddle: React.FC<HeaderButtonsProps> = ({ pathNow, navigate }) => {
  if (!['/', '/login', '/signup'].includes(pathNow)) return null;
  return (
    <button className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' onClick={() => navigate('/')}>
      <img src={logo} alt='메인 페이지로' className='w-[101px] desktop:w-[130px]' />
    </button>
  );
};

// 헤더 오른쪽 버튼
const HeaderRight: React.FC<HeaderButtonsProps> = ({ pathNow, user, navigate }) => {
  if (user) {
    return (
      <button className='flex items-center gap-[6px] ml-auto' onClick={() => navigate('/mypage')}>
        <img className='w-[25px] h-[25px] tablet:w-[30px] tablet:h-[30px] object-cover rounded-full' src={user.image} alt={pathNow} />
        <span className='hidden tablet:inline'>{user.nickname}</span>
      </button>
    );
  } else {
    if (pathNow !== '/login') {
      return (
        <span className='cursor-pointer text-md tablet:text-lg ml-auto' onClick={() => navigate('/login')}>
          로그인
        </span>
      );
    }
  }
  return null;
};

function Header({ user = mockUser }: HeaderProps) {
  const { pathname: pathNow } = useLocation();
  const navigate = useNavigate();

  return (
    <div className='bg-white flex h-[52px] px-[24px] tablet:h-[60px] tablet:px-[72px] desktop:px-[120px] desktop:h-[80px] items-center relative'>
      <HeaderLeft pathNow={pathNow} navigate={navigate} />
      <HeaderMiddle pathNow={pathNow} navigate={navigate} />
      <HeaderRight pathNow={pathNow} user={user} navigate={navigate} />
    </div>
  );
}

export default Header;
