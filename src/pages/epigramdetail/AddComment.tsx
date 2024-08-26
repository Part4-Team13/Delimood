import { Button, Switch } from '@mantine/core';
import { useRef, useState } from 'react';
import { usePostCommentMutation } from '../../hooks/useCommentQuery';
import alertMessage from '../../components/AlertMessage';
import { useQueryClient } from '@tanstack/react-query';

function AddComment({ id, userImage }: { id: number; userImage: string }) {
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [comment, setComment] = useState<string>('');
  const [isCommentPrivate, setIsCommentPrivate] = useState<boolean>(false);
  const addComment = useRef<HTMLTextAreaElement | null>(null);

  const queryClient = useQueryClient();

  const options = {
    onError: () => {
      alertMessage({ title: '실패했습니다.', message: '죄송합니다. 다시 시도해주세요.', color: 'red' });
    },
    onSettled: () => {
      queryClient.invalidateQueries();
    },
  };

  const commentMutation = usePostCommentMutation({ epigramId: id, options });

  const onAddCommentChange = () => {
    // NOTE: 100자 제한
    if ((addComment.current && addComment.current.value.length > 100) || (addComment.current && addComment.current.value.length == 0)) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }

    if (addComment.current) {
      setComment(addComment.current.value);
    }
  };

  const onClickAddCommentButton = () => {
    if (comment) commentMutation.mutate({ epigramId: id, content: comment, isPrivate: isCommentPrivate });
    addComment.current!.value = '';
    setComment(addComment.current!.value);
    setButtonDisabled(true);
  };

  return (
    <div className='w-[312px] tablet:w-[384px] desktop:w-[640px] mx-auto flex flex-col gap-[16px] tablet:gap-[24px] mb-[12px] tablet:mb-[32px] desktop:mb-[40px]'>
      <div className='flex flex-col items-center w-full gap-[10px]'>
        <div className='flex gap-[13px] desktop:gap-[21px] items-start w-full '>
          <img src={userImage} alt='내 프로필' className='w-[48px] h-[48px] rounded-full' style={{ objectFit: 'cover' }} />
          <div className='flex flex-col gap-[3px] w-full'>
            <textarea
              ref={addComment}
              placeholder='100자 이내로 입력해주세요'
              onChange={onAddCommentChange}
              className='w-full min-h-[100px] focus:outline-button-default border-[1px] bg-background border-line-darker p-[12px_16px] rounded-[8px]'
            />
            <div className='flex justify-between items-center left-[12px] right-[12px] bottom-[5px]'>
              <span className='h-fit flex gap-[8px] items-center'>
                <label htmlFor='setPrivate' className='text-gray-400 text-xs tablet:text-lg'>
                  공개
                </label>
                <Switch onChange={() => setIsCommentPrivate((prev) => !prev)} checked={!isCommentPrivate} color='#454545' id='setPrivate' />
              </span>
              <Button
                onClick={onClickAddCommentButton}
                disabled={buttonDisabled}
                className='text-md desktop:text-lg bg-button-default hover:bg-button-hover w-max mt-[5px] flex-shrink-0 disabled:bg-button-diabled'
              >
                저장
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddComment;
