import { useParams } from 'react-router-dom';
import ico_profile from '../../assets/ico_profile.svg';
import { useGetEpigramCommentsInfiniteQuery } from '../../hooks/useInfiniteQuery';
import { useGetMeQuery } from '../../hooks/useUserQuery';

import AddComment from './AddComment';
import EpigramCommentList from './EpigramCommentList';
import EpigramDetailMain from './EpigramDetailMain';

function EpigramDetail() {
  const { id } = useParams();
  const epigramId: number = Number(id);
  const { data: userData } = useGetMeQuery();
  const { data: commentData } = useGetEpigramCommentsInfiniteQuery(epigramId, { limit: 4 });

  if (userData) userData.image = userData.image ? userData.image : ico_profile;

  return (
    <>
      <div className='overflow-hidden'>
        {userData && (
          <>
            <EpigramDetailMain epigramId={epigramId} userId={userData?.id} />
            <div className='text-lg desktop:text-xl font-bold w-[312px] tablet:w-[384px] desktop:w-[640px] mx-auto mb-[16px] tablet:mb-[24px]'>댓글({commentData?.pages[0].totalCount})</div>
            <AddComment id={epigramId} userImage={userData.image} />
            <EpigramCommentList epigramId={epigramId} userId={userData.id} />
          </>
        )}
      </div>
    </>
  );
}

export default EpigramDetail;
