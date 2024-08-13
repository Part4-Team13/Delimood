import Kakao from '../../assets/ico_logo_kakao.svg';
import Google from '../../assets/ico_logo_google.svg';
import Naver from '../../assets/ico_logo_naver.svg';

const SocialButton: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  return (
    <button className='w-[40px] h-[40px] flex items-center justify-center desktop:w-[60px] desktop:h-[60px]'>
      <img src={src} alt={alt} />
    </button>
  );
};

const SocialLogin: React.FC = () => {
  return (
    <div className='my-[50px] w-[312px] tablet:w-[384px] desktop:w-[640px]'>
      <h2 className='flex items-center text-xs font-normal text-blue-400 space-between desktop:text-xl'>
        <span className='flex-grow mx-2 border-t border-blue-400' />
        SNS 계정으로 간편 로그인하기
        <span className='flex-grow mx-2 border-t border-blue-400' />
      </h2>

      <div className='flex items-center justify-center gap-4 mt-[24px] desktop:mt-[40px]'>
        <SocialButton src={Kakao} alt='Kakao' />
        <SocialButton src={Google} alt='Google' />
        <SocialButton src={Naver} alt='Naver' />
      </div>
    </div>
  );
};

export default SocialLogin;
