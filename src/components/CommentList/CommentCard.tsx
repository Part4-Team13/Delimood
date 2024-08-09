import TimeFormatter from '../../utils/TimeFormatter';

interface CommentCardProps {
  // id: number;
  updatedAt: string | Date;
  // isPrivate: boolean;
  content: string;
  writer: {
    id: number;
    image: string | null;
    nickname: string;
  };
}

function CommentCard({ updatedAt, content, writer }: CommentCardProps) {
  if (!writer.image) writer.image = '';

  const time = TimeFormatter(updatedAt);

  return (
    <div className='flex gap-[16px] items-start w-[360px] tablet:w-[384px] desktop:w-[640px] py-[16px] px-[24px] border-t-[1px] border-t-line-darker bg-background'>
      <span className='w-[48px] h-[48px] rounded-full bg-red-400 flex-shrink-0 overflow-hidden'>
        <img src={writer.image} alt={writer.nickname} />
      </span>
      <div className='flex flex-col gap-[8px] w-full'>
        <div className='relative w-full bg-green-300 flex gap-[8px] text-black-300'>
          <span className='text-xs tablet:text-md desktop:text-lg'>{writer.nickname}</span>
          <span className='text-xs tablet:text-md desktop:text-lg'>{time}</span>
          <div className='text-[12px] leading-[18px] tablet:text-[14px] desktop:text-[18px] absolute top-0 right-0 flex gap-[16px]'>
            <a className='text-black-600 hover:underline cursor-pointer'>수정</a>
            <a className='text-state-alert hover:underline cursor-pointer'>삭제</a>
          </div>
        </div>
        <p className='text-[14px] leading-[19px] tablet:text-lg desktop:text-xl text-black-600'>{content}</p>
      </div>
    </div>
  );
}

export default CommentCard;
