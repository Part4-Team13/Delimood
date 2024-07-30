interface CommentCardProps {
  // id: number;
  updatedAt: number;
  // isPrivate: boolean;
  content: string;
  writer: {
    image: string;
    nickname: string;
  };
}

function CommentCard({ updatedAt, content, writer }: CommentCardProps) {
  return (
    <div className='flex gap-[16px] items-start w-[360px] py-[16px] px-[24px] border-t-[1px] border-t-black'>
      <span className='w-[48px] h-[48px] rounded-full bg-red-400 flex-shrink-0'>이미지</span>
      <div className='flex flex-col gap-[8px] bg-gray-300 w-full'>
        <div className='relative w-full bg-green-300 flex gap-[8px]'>
          <span>{writer.nickname}</span>
          <span>{updatedAt}시간 전</span>
          <div className='absolute top-0 right-0 flex gap-[16px]'>
            <a>수정</a>
            <a>삭제</a>
          </div>
        </div>
        <p>{content}</p>
      </div>
    </div>
  );
}

export default CommentCard;
