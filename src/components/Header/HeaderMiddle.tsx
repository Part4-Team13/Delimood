import { HeaderButtonsProps } from '.';
import logo from '../../assets/ico_logo.svg';

export default function HeaderMiddle({ pathNow, navigate }: HeaderButtonsProps) {
  if (!['/', '/login', '/signup'].includes(pathNow)) return null;
  return (
    <button className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' onClick={() => navigate('/')}>
      <img src={logo} alt='메인 페이지로' className='w-[101px] desktop:w-[130px]' />
    </button>
  );
}
