import Kakao from '../../assets/ico_logo_kakao.svg';
import Google from '../../assets/ico_logo_google.svg';
import Naver from '../../assets/ico_logo_naver.svg';
import { v4 as uuidv4 } from 'uuid';
import { PUBLIC_KAKAO_CLIENT_ID, TEST_REDIRECT_URI, PUBLIC_NAVER_CLIENT_ID, TEST_NAVER_REDIRECT_URI } from '../../constants/env';

const SocialButton: React.FC<{ src: string; alt: string; href: string }> = ({ src, alt, href }) => {
  return (
    <a href={href} className='w-[40px] h-[40px] flex items-center justify-center desktop:w-[60px] desktop:h-[60px]' rel='noopener noreferrer'>
      <img src={src} alt={alt} />
    </a>
  );
};

const SocialLogin: React.FC = () => {
  const state = uuidv4();

  return (
    <div className='my-[50px] w-[312px] tablet:w-[384px] desktop:w-[640px]'>
      <h2 className='flex items-center text-xs font-normal text-blue-400 space-between desktop:text-xl'>
        <span className='flex-grow mx-2 border-t border-blue-400' />
        SNS 계정으로 간편 로그인하기
        <span className='flex-grow mx-2 border-t border-blue-400' />
      </h2>

      <div className='flex items-center justify-center gap-4 mt-[24px] desktop:mt-[40px]'>
        <SocialButton src={Kakao} alt='Kakao' href={`https://kauth.kakao.com/oauth/authorize?client_id=${PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${TEST_REDIRECT_URI}&response_type=code`} />
        <SocialButton src={Google} alt='Google' href={''} />
        <SocialButton
          src={Naver}
          alt='Naver'
          href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${PUBLIC_NAVER_CLIENT_ID}&redirect_uri=${TEST_NAVER_REDIRECT_URI}&state=${state}`}
        />
      </div>
    </div>
  );
};

export default SocialLogin;
