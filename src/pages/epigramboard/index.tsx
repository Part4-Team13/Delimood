import { useEffect, useState } from 'react';
import EpigramList from '../../components/EpigramList';
import { useGetEpigramListInfiniteQuery } from '../../hooks/useEpigramQuery';
import ico_view_frames from '../../assets/ico_view_frames.svg';
import ico_view_line from '../../assets/ico_view_line.svg';

export default function EpigramBoard() {
  const [isWide, setIsWide] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(false);
  const { data, fetchNextPage, isLoading } = useGetEpigramListInfiniteQuery({ limit: 6 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 744) {
        setIsWide(true);
        setShowButton(false);
      } else {
        setShowButton(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const onClickIsWideButton = () => {
    setIsWide((prev) => !prev);
  };

  return (
    <>
      <div className='mt-[32px] desktop:mt-[120px] w-[312px] tablet:w-[600px] desktop:w-[1200px] mx-auto flex justify-between'>
        <span className='text-lg desktop:text-2xl font-bold'>피드</span>
        {showButton && (
          <button onClick={onClickIsWideButton}>
            <img src={isWide ? ico_view_line : ico_view_frames} alt='두 줄로 보기' />
          </button>
        )}
      </div>

      <div className='mt-[40px] mb-[114px]'>
        <EpigramList data={data} fetchNextPage={fetchNextPage} isLoading={isLoading} isWide={isWide} />
      </div>
    </>
  );
}
