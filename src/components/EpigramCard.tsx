import React from 'react';
import { EpigramListType } from '../schema/epigram/EpigramGet';
import { useNavigate } from 'react-router-dom';
import like from '../assets/ico_like.svg';

type EpigramCardProps = Pick<EpigramListType, 'id' | 'author' | 'content' | 'tags' | 'likeCount'> & { isSeperated: boolean };
// type LikeButtonProps = Pick<EpigramCardProps, 'id'>;

// 클릭 시 해당 epigram의 like +1
const onClickLikeButton = () => {};

const LikeButton = (): JSX.Element => {
  return (
    <button onClick={onClickLikeButton} className={`bg-button-diabled hover:bg-button-hover w-[20px] tablet:w-[24px] rounded-full p-[2px] absolute  right-[6px] top-[6px] z-10`}>
      {/* {${*isMine ? 'bg-button-default cursor-pointer hover:bg-button-hover' : 'bg-button-diabled cursor-default' }} */}
      <img src={like} alt='좋아요' />
    </button>
  );
};

function EpigramCard({ id, author, content, tags, isSeperated = false }: EpigramCardProps): JSX.Element {
  const navigate = useNavigate();
  const onClickEpigramCard = () => {
    navigate(`/epigrams/${id}`);
  };

  return (
    <>
      <div
        onClick={onClickEpigramCard}
        className={`relative font-paraph text-md tablet:text-lg desktop:text-2xl ${isSeperated ? 'w-[152px] tablet:w-[294px] desktop:w-[585px]' : 'w-[312px] tablet:w-[384px] desktop:w-[640px]'}`}
      >
        <div
          className={`striped desktop:striped-desktop cursor-pointer rounded-[16px] p-[23px] flex flex-col overflow-hidden ${isSeperated ? 'h-[110px] tablet:h-[180px] desktop:h-[259px] justify-between' : ''}`}
        >
          <div className={`text-black-600 flex-shrink-0 ${isSeperated ? 'line-clamp-2 tablet:line-clamp-4 desktop:line-clamp-5' : 'min-h-[48px]'}`}>
            <p>{content}</p>
          </div>
          <span className='text-blue-400 ml-auto'>- {author} -</span>
        </div>
        <ul className='flex flex-row gap-[8px] text-blue-400 ml-auto w-fit'>
          {tags.map((tag) => (
            <li key={tag.id}>#{tag.name}</li>
          ))}
        </ul>
        <LikeButton />
      </div>
    </>
  );
}

const MemoizedCard = React.memo(EpigramCard);

export default MemoizedCard;
