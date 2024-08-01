import CommentCard from './CommentCard';

interface CommentListProps {
  // id: number;
  isInfiniteScroll: boolean;
}

const MockData = [
  { id: 1, updatedAt: 1, content: '이 글을 보니 힘이 납니다! 잘 하셨습니다!', writer: { image: '이미지', nickname: '작성자' } },
  { id: 2, updatedAt: 3, content: '이 글을 보니 힘이 빠집니다.. 실수 하셨습니다!', writer: { image: '이미지2', nickname: '관찰자' } },
  { id: 3, updatedAt: 6, content: '너무 더워.. 너무!!', writer: { image: '이미지2', nickname: '관찰자' } },
];

function CommentList({ isInfiniteScroll }: CommentListProps) {
  return (
    <div className='bg-background'>
      <ul className='mx-auto bg-yellow-300 w-fit'>
        {MockData.map((data) => (
          <li key={data.id}>
            <CommentCard updatedAt={data.updatedAt} content={data.content} writer={data.writer} />
          </li>
        ))}
      </ul>
      {isInfiniteScroll && <button>더보기버튼</button>}
    </div>
  );
}

export default CommentList;
