import { useNavigate } from 'react-router-dom';
import ico_sad from '../assets/ico_sad.svg';

function Error(): JSX.Element {
  const navigate = useNavigate();

  return (
    <>
      <div className='absolute flex flex-col items-center gap-[10px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <img src={ico_sad} alt='에러 발생' className=' w-[100px] mb-[10px]' />
        <span className='text-centerw-fit text-xl desktop:text-2xl whitespace-pre'>문제가 발생했어요!</span>
        <button className='text-md desktop:text-lg w-fit border-[1px] border-line-darker p-[10px_15px] rounded-full hover:bg-blue-300 whitespace-pre' onClick={() => navigate('/epigrams')}>
          메인으로 돌아가기
        </button>
      </div>
    </>
  );
}

export default Error;
