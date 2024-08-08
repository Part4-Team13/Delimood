import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import plus from '../assets/ico_plus.svg';
import arrowUp from '../assets/ico_arrow_up.svg';

interface ButtonProps {
  text?: string;
}

function FixedButton({ text = '에피그램 만들기' }: ButtonProps) {
  const navigate = useNavigate();
  const [isScrollButtonVisible, setIsScrollButtonVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      //NOTE: 현재 스크롤 위치가 100px 이상일 경우 버튼 생성
      if (window.scrollY > 100) {
        setIsScrollButtonVisible(true);
      } else {
        setIsScrollButtonVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    navigate('/addepigram');
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={`fixed bottom-20 right-[120px] flex flex-col items-end gap-4 transition-opacity duration-300`}>
      {/* 기본으로 따라다니는 에피그램 만들기 버튼 */}
      <button onClick={handleClick} className='bg-blue-900 w-[194px] h-[64px] flex items-center justify-center text-white text-xl font-semibold py-2 px-4 rounded-full hover:bg-blue-800'>
        <img src={plus} alt='Plus Icon' className='mr-2 w-6 h-6' />
        {text}
      </button>

      {/* 스크롤 버튼은 스크롤 시에만 보이게 */}
      {isScrollButtonVisible && (
        <button onClick={scrollTop} className='bg-blue-900 text-white w-[64px] h-[64px] flex items-center justify-center rounded-full shadow-lg hover:bg-blue-800'>
          <img src={arrowUp} alt='Arrow Up Icon' className='w-6 h-6' />
        </button>
      )}
    </div>
  );
}

export default FixedButton;
