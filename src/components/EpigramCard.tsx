import React from 'react';
import { EpigramListType } from '../schema/epigram/EpigramGet';

type EpigramCardProps = Pick<EpigramListType, 'id' | 'author' | 'content' | 'tags' | 'likeCount'> & { isSeperated: boolean };

function EpigramCard({ id, author, content, tags, isSeperated }: EpigramCardProps) {
  return (
    <>
      <div className={`font-paraph text-md tablet:text-lg desktop:text-2xl ${isSeperated ? 'w-[152px] tablet:w-[294px] desktop:w-[585px]' : 'w-[312px] tablet:w-[384px] desktop:w-[640px]'}`}>
        <div className={`striped desktop:striped-desktop rounded-[16px] p-[23px] flex flex-col overflow-hidden ${isSeperated ? 'h-[110px] tablet:h-[180px] desktop:h-[259px] justify-between' : ''}`}>
          <div className={`text-black-600 flex-shrink-0 ${isSeperated ? 'line-clamp-2 tablet:line-clamp-4 desktop:line-clamp-5' : ''}`}>
            <p>{`${content} - ${id}`}</p>
          </div>
          <span className='ml-auto text-blue-400'>- {author} -</span>
        </div>
        <ul className='flex flex-row gap-[8px] text-blue-400 ml-auto w-fit'>
          {tags.map((tag) => (
            <li key={tag.id}>#{tag.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

const MemoizedCard = React.memo(EpigramCard);

export default MemoizedCard;
