import { HeaderButtonsProps } from '.';
import { useGetMeQuery } from '../../hooks/useUserQuery';
import user from '../../assets/ico_user.svg';

// 로그인 O
export function HeaderRight({ pathNow, navigate }: HeaderButtonsProps) {
  const { data } = useGetMeQuery();
  if (data) {
    const src = data.image ? data.image : user;
    return (
      <button className='flex items-center gap-[6px] ml-auto' onClick={() => navigate('/mypage')}>
        <img className='w-[25px] h-[25px] tablet:w-[30px] tablet:h-[30px] object-cover rounded-full' src={src} alt={pathNow} />
        <span className='hidden tablet:inline text-gray-300 text-sm desktop:text-md'>{data.nickname}</span>
      </button>
    );
  }
  return null;
}

// 로그인 X
export function HeaderRightUnAuthenticated({ pathNow, navigate }: Pick<HeaderButtonsProps, 'pathNow' | 'navigate'>) {
  if (pathNow !== '/login') {
    return (
      <span className='cursor-pointer text-md tablet:text-lg ml-auto' onClick={() => navigate('/login')}>
        로그인
      </span>
    );
  }
  return null;
}
