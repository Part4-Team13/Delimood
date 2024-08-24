import Kakao from '../../assets/ico_logo_kakao.svg';
import Google from '../../assets/ico_logo_google.svg';
import Naver from '../../assets/ico_logo_naver.svg';
import { v4 as uuidv4 } from 'uuid';
import { PUBLIC_KAKAO_CLIENT_ID, PUBLIC_GOOGLE_CLIENT_ID, KAKAO_REDIRECT_URI, GOOGLE_REDIRECT_URI, PUBLIC_NAVER_CLIENT_ID, NAVER_REDIRECT_URI } from '../../constants/env';

const SocialButton: React.FC<{ src: string; alt: string; href: string; hoverColor: string }> = ({ src, alt, href, hoverColor }) => {
  return (
    <a
      href={href}
      className='w-[40px] h-[40px] flex items-center justify-center desktop:w-[60px] desktop:h-[60px] border desktop:border-2 border-gray-100 rounded-[5px]'
      style={{ '--hover-color': hoverColor } as React.CSSProperties}
      rel='noopener noreferrer'
    >
      <img src={src} alt={alt} className='w-[20px] desktop:w-[27px]' />
      <style>{`a:hover { background-color: var(--hover-color); }`}</style>
    </a>
  );
};

//NOTE : 사용자가 버튼을 클릭하면 해당 소셜로그인 페이지로 리디렉션됨.
const SocialLogin: React.FC = () => {
  const state = uuidv4();

  return (
    <div className='my-[50px] w-[312px] tablet:w-[384px] desktop:w-[640px]'>
      <h2 className='flex items-center text-xs font-normal text-blue-400 space-between desktop:text-xl'>
        <span className='flex-grow mx-2 border-t border-blue-400' />
        SNS 계정으로 간편 로그인하기
        <span className='flex-grow mx-2 border-t border-blue-400' />
      </h2>

      <div className='flex items-center justify-center gap-4 mt-[24px] desktop:mt-[40px] desktop:gap-6'>
        <SocialButton
          src={Kakao}
          alt='Kakao'
          href={`https://kauth.kakao.com/oauth/authorize?client_id=${PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`}
          hoverColor='#FEE500'
        />
        <SocialButton
          src={Google}
          alt='Google'
          href={`https://accounts.google.com/o/oauth2/auth?client_id=${PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`}
          hoverColor='#DB4437'
        />
        <SocialButton
          src={Naver}
          alt='Naver'
          href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${PUBLIC_NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=${state}`}
          hoverColor='#3CBB3C'
        />
      </div>
    </div>
  );
};

export default SocialLogin;
