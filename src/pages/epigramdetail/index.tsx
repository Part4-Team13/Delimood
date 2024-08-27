import { useParams } from 'react-router-dom';

import { useGetEpigramCommentsInfiniteQuery } from '../../hooks/useInfiniteQuery';
import { useGetMeQuery } from '../../hooks/useUserQuery';

import AddComment from './AddComment';
import EpigramCommentList from './EpigramCommentList';
import EpigramDetailMain from './EpigramDetailMain';

import ico_profile from '../../assets/ico_profile.svg';
import SuspenseWrapper from '../../components/SuspenseWrapper';

function EpigramDetail() {
  const { id } = useParams();
  const epigramId: number = Number(id);
  const { data: userData } = useGetMeQuery();
  const { data: commentData } = useGetEpigramCommentsInfiniteQuery(epigramId, { limit: 4 });

  userData.image = userData.image ? userData.image : ico_profile;

  return (
    <div className='overflow-hidden'>
      <SuspenseWrapper color='yellow'>
        <EpigramDetailMain epigramId={epigramId} userId={userData.id} />
      </SuspenseWrapper>
      <div className='text-lg desktop:text-xl font-bold w-[312px] tablet:w-[384px] desktop:w-[640px] mx-auto mb-[16px] tablet:mb-[24px]'>댓글({commentData.pages[0].totalCount})</div>
      <SuspenseWrapper color='yellow'>
        <AddComment id={epigramId} userImage={userData.image} />
      </SuspenseWrapper>
      <SuspenseWrapper color='yellow'>
        <EpigramCommentList epigramId={epigramId} userId={userData.id} />
      </SuspenseWrapper>
    </div>
  );
}

export default EpigramDetail;
