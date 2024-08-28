import { HeaderButtonsProps } from '.';
import logo from '../../assets/ico_newLogo.svg';

export default function HeaderMiddle({ pathNow, navigate }: HeaderButtonsProps) {
  if (!['/', '/login', '/signup'].includes(pathNow)) return null;
  return (
    <button className='absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2' onClick={() => navigate('/')}>
      <img src={logo} alt='메인 페이지로' className='w-[130px] desktop:w-[190px]' />
    </button>
  );
}
