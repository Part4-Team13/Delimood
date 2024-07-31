import { PropsWithChildren } from 'react';
import EpigramCard from './EpigramCard';
import ViewMore from './ViewMore';

interface EpigramListProps extends PropsWithChildren {
  //  isMine: boolean;
  isWide?: boolean;
}

const mockDatas = [
  { id: 1, author: '니체', content: '신은 죽었다... 없다! 진짜 없다. 제발 좀 알아라!', tags: ['tag1', 'tag2'] },
  { id: 2, author: '소크라테스', content: '너 자신을 ALLA', tags: ['tag1', 'tag2'] },
  { id: 3, author: '궁예', content: '누가 기침소리를 내었는가', tags: ['tag1', 'tag2'] },
];

const handleViewMore = () => {};

function EpigramList({ isWide = false }: EpigramListProps) {
  return (
    <div className='w-screen bg-blue-300 flex flex-col gap-[72px]'>
      <ul className={`mx-auto w-fit grid gap-[16px] ${isWide ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {mockDatas.map((data) => (
          <li key={data.id}>
            <EpigramCard author={data.author} content={data.content} tags={data.tags} isHeightfixed={isWide} />
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
