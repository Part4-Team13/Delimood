import React from 'react';

interface Tag {
  id: number;
  name: string;
}

interface CardProps {
  content: string;
  author: string;
  tags: Tag[];
  searchTerm: string;
}

//NOTE : 각 에피그램에서 사용자가 입력한 단어를 파란색으로 강조하기 위한 함수
const highlight = (text: string, searchTerm: string) => {
  if (!searchTerm) return text;
  const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
  return parts.map((part, index) =>
    part.toLowerCase() === searchTerm.toLowerCase() ? (
      <span key={index} style={{ color: '#5195EE' }}>
        {part}
      </span>
    ) : (
      part
    ),
  );
};

const SearchCard: React.FC<CardProps> = ({ content, author, tags, searchTerm }) => {
  return (
    <div className='tablet:w-[384px] bg-white text-base font-normal border-b-1 desktop:text-xl border-b border-gray-100 min-w-[360px] desktop:w-[640px] px-[24px] py-[16px] gap-2 desktop:py-[24px] desktop:gap-4'>
      <div className='flex flex-col gap-1 text-black-600 font-paraph tablet:gap-2 desktop:gap-6'>
        <p>{highlight(content, searchTerm)}</p>
        <p className='text-blue-400'>- {highlight(author, searchTerm)} -</p>
      </div>

      <div className='flex justify-end space-x-[12px] text-blue-400 '>
        {tags.map((tag) => (
          <span key={tag.id}>{highlight(tag.name, searchTerm)}</span>
        ))}
      </div>
    </div>
  );
};

export default SearchCard;
