import timeFormatter from '../../utils/TimeFormatter';
import profileIcon from '../../assets/ico_profile.svg';
import { useDeleteCommentMutation, usePatchCommentMutation } from '../../hooks/useCommentQuery';
import React, { useRef, useState } from 'react';
import { IconLock, IconX } from '@tabler/icons-react';
import { showNotification } from '@mantine/notifications';
import { Button, rem } from '@mantine/core';
import ProfileModal from '../Modal/profileModal';
import DeleteModal from '../Modal/commentDeleteModal';
import { PatchCommentType } from '../../schema/commentSchema';
import { useQueryClient } from '@tanstack/react-query';

interface CommentCardProps {
  userId?: number;
  id: number;
  createdAt: string | Date;
  isPrivate: boolean;
  content: string;
  writer: {
    id: number;
    image: string | null;
    nickname: string;
  };
}
const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;

function CommentCard({ createdAt, id, content, writer, userId, isPrivate }: CommentCardProps) {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isPatching, setIsPatching] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<PatchCommentType>({ isPrivate, content });
  const inputTextRef = useRef<HTMLInputElement | null>(null);
  const inputCheckRef = useRef<HTMLInputElement | null>(null);

  const queryClient = useQueryClient();

  // onError 옵션
  const options = {
    onError: () => {
      showNotification({
        title: '실패했습니다.',
        message: '죄송합니다. 다시 시도해주세요.',
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
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  };

  const time = timeFormatter(createdAt);

  // 댓글 삭제
  const deleteMutation = useDeleteCommentMutation(options);
  const deleteComment = () => {
    deleteMutation.mutate({ id });
    setIsDeleteModalOpen(false);
  };

  // 댓글 수정
  const patchMutation = usePatchCommentMutation({ epigramId: id, options });
  const handleClickPatch = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setIsPatching(true);
  };
  const handleInputChange = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    if (inputCheckRef.current && inputTextRef.current) {
      setCurrentData({ content: inputTextRef.current.value, isPrivate: inputCheckRef.current.checked });
    }
  };
  const handleClickComplete = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    patchMutation.mutate({ id, data: currentData });
    setIsPatching(false);
  };

  // 프로필 클릭
  const handleClickProfile = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setIsProfileModalOpen(true);
  };

  return (
    <>
      <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} icon={writer.image} profileId={writer.id} />
      <DeleteModal
        message='댓글을 삭제하시겠어요?'
        secondaryMessage='댓글은 삭제 후 복구할 수 없어요.'
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        buttons={[
          { text: '취소', onClick: () => setIsDeleteModalOpen(false), variant: 'secondary' },
          { text: '삭제하기', onClick: () => deleteComment(), variant: 'primary' },
        ]}
      />

      <div className='flex gap-[16px] items-start w-[360px] tablet:w-[384px] desktop:w-[640px] py-[16px] px-[24px] border-t-[1px] border-t-line-darker h-fit'>
        <button onClick={handleClickProfile} className='w-[48px] h-[48px] rounded-full bg-red-400 flex-shrink-0 overflow-hidden'>
          {<img src={writer.image ? writer.image : profileIcon} alt={writer.nickname} className='object-cover w-full h-full' />}
        </button>
        <div className='flex flex-col gap-[8px] w-full'>
          <div className='relative w-full bg-green-300 flex gap-[8px] text-black-300 items-center'>
            <span className='text-xs tablet:text-md desktop:text-lg'>{writer.nickname}</span>
            <span className='text-xs tablet:text-md desktop:text-lg'>{time}</span>
            {isPrivate && (
              <span>
                <IconLock className='h-[14px] ml-[-10px] desktop:h-[20px] desktop:ml-[-5px]' />
              </span>
            )}
            {userId === writer.id ? (
              !isPatching ? (
                <div className='text-[12px] leading-[18px] tablet:text-[14px] desktop:text-[18px] absolute top-0 right-0 flex gap-[16px] tablet:mt-[3px]'>
                  <button className='text-black-600 hover:underline cursor-pointer' onClick={(e) => handleClickPatch(e)}>
                    수정
                  </button>
                  <button className='text-state-alert hover:underline cursor-pointer' onClick={() => setIsDeleteModalOpen(true)}>
                    삭제
                  </button>
                </div>
              ) : (
                <span className='flex items-center gap-[3px] ml-auto'>
                  <input type='checkbox' defaultChecked={isPrivate} onClick={(e) => handleInputChange(e)} ref={inputCheckRef} /> <span>비밀글</span>
                </span>
              )
            ) : null}
          </div>
          {!isPatching ? (
            <p className='text-[14px] leading-[19px] tablet:text-lg desktop:text-xl text-black-600 h-full'>{content}</p>
          ) : (
            <div className='flex gap-[10px] items-center'>
              <input
                type='text'
                value={currentData.content}
                ref={inputTextRef}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => handleInputChange(e)}
                className='text-[14px] leading-[19px] tablet:text-lg desktop:text-xl text-black-600 p-[10px_5px] border-line-darker border-[1px] bg-line-bright rounded-[5px] w-full h-max'
              />
              <Button
                disabled={inputTextRef.current?.value.length === 0}
                onClick={handleClickComplete}
                className='flex-shrink-0 bg-blue-600 text-white p-[5px] rounded-[5px] disabled:bg-button-diabled'
              >
                완료
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const MemoizedCard = React.memo(CommentCard);

export default MemoizedCard;
