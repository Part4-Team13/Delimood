import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import HeaderLeft from './HeaderLeft';
import HeaderMiddle from './HeaderMiddle';
import { HeaderRight, HeaderRightUnAuthenticated } from './HeaderRight';

export interface HeaderButtonsProps {
  pathNow: string;
  navigate: NavigateFunction;
}

function Header() {
  const { pathname: pathNow } = useLocation();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');

  return (
    <div className='bg-white flex h-[52px] px-[24px] tablet:h-[60px] tablet:px-[72px] desktop:px-[120px] desktop:h-[80px] items-center relative'>
      <HeaderLeft pathNow={pathNow} navigate={navigate} />
      <HeaderMiddle pathNow={pathNow} navigate={navigate} />
      {accessToken ? <HeaderRight pathNow={pathNow} navigate={navigate} /> : <HeaderRightUnAuthenticated pathNow={pathNow} navigate={navigate} />}
    </div>
  );
}

export default Header;
