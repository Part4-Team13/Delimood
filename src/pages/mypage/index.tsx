import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from '@mantine/core';
import EmotionController from './emotionController';
import EmotionList from '../../components/EmotionList';
import dayjs from 'dayjs';
import UserProfile from './UserProfile';
import MyCommentsList from './MyCommentsList';
import MyEpigramList from './MyEpigramList';
import { useGetMeQuery } from '../../hooks/useUserQuery';
import { useGetMyCommentInfiniteQuery } from '../../hooks/useInfiniteQuery';
import DeleteModal from '../../components/Modal/commentDeleteModal';
import alertMessage from '../../components/AlertMessage';

export default function Mypage() {
  const navigate = useNavigate();
  const today = dayjs().format('YYYY.MM.DD');

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const { data: userData, isLoading: isUserLoading } = useGetMeQuery();
  const [activeTab, setActiveTab] = useState<'epigrams' | 'comments'>('epigrams');
  const [totalCommentsCount, setTotalCommentsCount] = useState<number>(0);
  const [totalEpigramsCount, setTotalEpigramsCount] = useState<number>(0);

  const { data: commentData } = useGetMyCommentInfiniteQuery({
    limit: 1,
    id: userData?.id ?? -1,
  });

  //NOTE : 댓글 데이터가 로드되면 총 댓글 수를 업데이트
  useEffect(() => {
    if (userData?.id && commentData?.pages?.[0]?.totalCount !== undefined) {
      setTotalCommentsCount(commentData.pages[0].totalCount);
    } else {
      setTotalCommentsCount(0);
    }
  }, [commentData, userData]);

  const handleLogout = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    alertMessage({ title: '성공적으로 로그아웃되었습니다.', message: '다시 이용하시려면 로그인부탁드립니다.', color: 'teal' });

    navigate('/login');
  };

  if (isUserLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader color='cyan' size='lg' />
      </div>
    );
  }

  const userId = userData?.id;

  return (
    <>
      <DeleteModal
        message='정말 로그아웃하실건가요?'
        secondaryMessage='다시 이용하시려면 로그인이 필요합니다.'
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        buttons={[
          { text: '돌아가기', onClick: () => setIsDeleteModalOpen(false) },
          {
            text: '로그아웃',
            onClick: () => {
              setIsDeleteModalOpen(false);
              confirmLogout();
            },
          },
        ]}
      />
      <div className='flex flex-col mb-[114px] tablet:mb-[241px] desktop:mb-[395px] gap-14 desktop:gap-24'>
        <div className='flex flex-col items-center justify-center bg-white mt-[64px] desktop:mt-[128px] shadow-mypage rounded-[24px]'>
          <UserProfile />
          <button
            onClick={handleLogout}
            className='h-[36px] w-[77px] desktop:h-[48px] desktop:w-[100px] desktop:text-xl mb-[56px] mt-[16px] desktop:mt-[24px] desktop:mb-[96px] rounded-[100px] text-sm font-normal bg-line-bright text-gray-300 '
          >
            로그아웃
          </button>
          <div className='mb-[56px] tablet:mb-[60px] desktop:mb-[164px] flex flex-col gap-6 desktop:gap-12'>
            <div className='w-[344px] tablet:w-[384px] desktop:w-[640px] flex justify-between'>
              <h2 className='text-base font-semibold text-black-600 desktop:text-2xl'>오늘의 감정</h2>
              <span className='text-base font-normal text-blue-400 tablet:mr-2 desktop:text-xl'>{today}</span>
            </div>
            <EmotionList />
          </div>
          <EmotionController />
        </div>
        <div className='flex flex-col items-center justify-center gap-6 tablet:gap-8 desktop:gap-12'>
          <div className='w-[312px] tablet:w-[384px] desktop:w-[640px] flex flex-end gap-4 desktop:gap-6 font-semibold text-base desktop:text-2xl'>
            <button onClick={() => setActiveTab('epigrams')} className={`cursor-pointer ${activeTab === 'epigrams' ? 'text-black-600' : 'text-gray-300'}`}>
              내 에피그램<span> ({totalEpigramsCount})</span>
            </button>
            <button onClick={() => setActiveTab('comments')} className={`cursor-pointer ${activeTab === 'comments' ? 'text-black-600' : 'text-gray-300'}`}>
              내 댓글<span> ({totalCommentsCount})</span>
            </button>
          </div>
          {userId && activeTab === 'epigrams' && <MyEpigramList userId={userId} onTotalCountFetched={setTotalEpigramsCount} />}
          {userId && activeTab === 'comments' && <MyCommentsList userId={userId} onTotalCountFetched={setTotalCommentsCount} />}
        </div>
      </div>
    </>
  );
}
