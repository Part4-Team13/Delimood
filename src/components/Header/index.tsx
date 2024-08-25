import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import HeaderLeft from './HeaderLeft';
import HeaderMiddle from './HeaderMiddle';
import { HeaderRight, HeaderRightUnAuthenticated } from './HeaderRight';
import { useEffect, useState } from 'react';

export interface HeaderButtonsProps {
  pathNow: string;
  navigate: NavigateFunction;
}

function Header() {
  const [isScrollUp, setIsScrollUp] = useState<boolean>(true);

  const { pathname: pathNow } = useLocation();
  const navigate = useNavigate();
  const refreshToken = localStorage.getItem('refreshToken');

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleDetectScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY) {
        setIsScrollUp(true);
      } else {
        setIsScrollUp(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleDetectScroll);

    return () => {
      window.removeEventListener('scroll', handleDetectScroll);
    };
  }, []);

  return (
    <div
      className={`bg-white flex h-[52px] px-[24px] tablet:h-[60px] tablet:px-[72px] desktop:px-[120px] desktop:h-[80px] items-center fixed left-0 right-0 z-50 shadow-epigramdetail transition-all ease-in-out delay-150 ${isScrollUp ? 'top-0' : 'top-[-52px] tablet:top-[-60px] desktop:top-[-80px]'}`}
    >
      <HeaderLeft pathNow={pathNow} navigate={navigate} />
      <HeaderMiddle pathNow={pathNow} navigate={navigate} />
      {refreshToken ? <HeaderRight pathNow={pathNow} navigate={navigate} /> : <HeaderRightUnAuthenticated pathNow={pathNow} navigate={navigate} />}
    </div>
  );
}

export default Header;
