import ico_sad from '../assets/ico_sad.svg';

function ErrorComponent(): JSX.Element {
  return (
    <>
      <div className=' flex flex-col items-center gap-[10px] justify-center'>
        <img src={ico_sad} alt='에러 발생' className=' w-[100px] mb-[10px]' />
        <span className='text-xl whitespace-pre text-centerw-fit desktop:text-2xl'>문제가 발생했어요!</span>
      </div>
    </>
  );
}

export default ErrorComponent;
