import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GetEpigramListType } from '../../schema/epigramSchema';
import LikeButton from './LikeButton';

type EpigramCardProps = Pick<GetEpigramListType, 'id' | 'author' | 'content' | 'tags'> & { isSeperated: boolean };

function EpigramCard({ id, author, content, tags, isSeperated = false }: EpigramCardProps) {
  const navigate = useNavigate();
  const onClickEpigramCard = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    navigate(`/epigrams/${id}`);
  };

  return (
    <>
      <div
        onClick={(e) => onClickEpigramCard(e)}
        className={`relative font-paraph text-md tablet:text-lg desktop:text-2xl ${isSeperated ? 'w-[152px] tablet:w-[294px] desktop:w-[585px]' : 'w-[312px] tablet:w-[384px] desktop:w-[640px]'} ${tags.length == 0 ? 'mb-[24px] tablet:mb-[26px] desktop:mb-[32px]' : ''}`}
      >
        <div
          className={`shadow-epigramCard striped desktop:striped-desktop cursor-pointer rounded-[16px] p-[23px] flex flex-col overflow-hidden ${isSeperated ? 'h-[110px] tablet:h-[180px] desktop:h-[259px] justify-between' : ''}`}
        >
          <div className={`text-black-600 flex-shrink-0 ${isSeperated ? 'line-clamp-2 tablet:line-clamp-4 desktop:line-clamp-5' : 'min-h-[48px]'}`}>
            <p>{content}</p>
          </div>
          <span className='ml-auto text-blue-400'>- {author} -</span>
        </div>
        <ul className={`flex text-blue-400 ml-auto w-fit mt-[8px] ${isSeperated ? 'flex-col tablet:flex-row gap-0 tablet:gap-[12px] desktop:gap-[16px]' : 'flex-row gap-[8px]'}`}>
          {tags.map((tag) => (
            <li key={tag.id} className='cursor-default'>
              {tag.name.startsWith('#') ? '' : '#'}
              {tag.name}
            </li>
          ))}
        </ul>
        <LikeButton id={id} />
      </div>
    </>
  );
}

const MemoizedCard = React.memo(EpigramCard);

export default MemoizedCard;
