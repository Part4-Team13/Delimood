import TimeFormatter from '../../utils/TimeFormatter';
import profileIcon from '../../assets/ico_profile.svg';
import { useDeleteCommentMutation } from '../../hooks/useCommentQuery';
import React from 'react';
import { IconLock, IconX } from '@tabler/icons-react';
import { showNotification } from '@mantine/notifications';
import { rem } from '@mantine/core';

interface CommentCardProps {
  userId?: number;
  id: number;
  updatedAt: string | Date;
  isPrivate: boolean;
  content: string;
  writer: {
    id: number;
    image: string | null;
    nickname: string;
  };
}
const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;

function CommentCard({ updatedAt, id, content, writer, userId, isPrivate }: CommentCardProps) {
  const mutation = useDeleteCommentMutation({
    onError: () => {
      showNotification({
        title: '죄송합니다. 다시 시도해주세요.',
        message: '댓글 삭제를 실패했습니다.',
        icon: xIcon,
        color: 'red',
        autoClose: 2000,
        styles: () => ({
          root: {
            position: 'fixed',
            top: '10%',
            right: '3%',
            transform: 'translate(-50%, -50%)',
            minWidth: '300px',
            width: '40%',
            maxWidth: '70%',
          },
        }),
      });
    },
  });
  const time = TimeFormatter(updatedAt);
  const handleClickDelete = () => {
    mutation.mutate({ id });
  };

  return (
    <div className='flex gap-[16px] items-start w-[360px] tablet:w-[384px] desktop:w-[640px] py-[16px] px-[24px] border-t-[1px] border-t-line-darker bg-background'>
      <span className='w-[48px] h-[48px] rounded-full bg-red-400 flex-shrink-0 overflow-hidden'>{<img src={writer.image ? writer.image : profileIcon} alt={writer.nickname} />}</span>
      <div className='flex flex-col gap-[8px] w-full'>
        <div className='relative w-full bg-green-300 flex gap-[8px] text-black-300 items-center'>
          <span className='text-xs tablet:text-md desktop:text-lg'>{writer.nickname}</span>
          <span className='text-xs tablet:text-md desktop:text-lg'>{time}</span>
          {isPrivate && (
            <span>
              <IconLock className='h-[14px] ml-[-10px] desktop:h-[20px] desktop:ml-[-5px]' />
            </span>
          )}
          {userId === writer.id && (
            <div className='text-[12px] leading-[18px] tablet:text-[14px] desktop:text-[18px] absolute top-0 right-0 flex gap-[16px] tablet:mt-[3px]'>
              <a className='text-black-600 hover:underline cursor-pointer'>수정</a>
              <a className='text-state-alert hover:underline cursor-pointer' onClick={handleClickDelete}>
                삭제
              </a>
            </div>
          )}
        </div>
        <p className='text-[14px] leading-[19px] tablet:text-lg desktop:text-xl text-black-600'>{content}</p>
      </div>
    </div>
  );
}

const MemoizedCard = React.memo(CommentCard);

export default MemoizedCard;
