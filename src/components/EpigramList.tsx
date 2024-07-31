import { PropsWithChildren } from 'react';
import EpigramCard from './EpigramCard';
import ViewMore from './ViewMore';

interface EpigramListProps extends PropsWithChildren {
  //  isMine: boolean;
  isWide?: boolean;
}

const mockDatas = [
  {
    id: 1,
    author: '니체',
    content: '신은 죽었다... 없다! 진짜 없다. 제발 좀 알아라! 좀 더 길게 적기 위해 아무말이나 추가하겠다~! 진짜 할 말 없지만 점점점을 추가하기 위해.........',
    tags: ['tag1', 'tag2'],
  },
  { id: 2, author: '소크라테스', content: '너 자신을 ALLA', tags: ['tag1', 'tag2'] },
  { id: 3, author: '궁예', content: '누가 기침소리를 내었는가', tags: ['tag1', 'tag2'] },
];

const handleViewMore = () => {};

function EpigramList({ isWide = false }: EpigramListProps) {
  return (
    <div className='flex flex-col gap-[72px] mx-auto'>
      <ul
        className={`mx-auto max-w-fit grid ${isWide ? 'grid-cols-2 gap-y-[16px] gap-x-[8px] tablet:gap-y-[24px] tablet:gap-x-[12px] desktop:gap-y-[40px] desktop:gap-x-[20px]' : 'grid-cols-1 gap-[16px]'}`}
      >
        {mockDatas.map((data) => (
          <li key={data.id}>
            <EpigramCard author={data.author} content={data.content} tags={data.tags} isSeperated={isWide} />
          </li>
        ))}
      </ul>

      <div className='mx-auto'>
        <ViewMore text={isWide ? '에피그램 더보기' : '더보기'} onClick={() => handleViewMore} />
      </div>
    </div>
  );
}

export default EpigramList;
