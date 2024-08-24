import { useGetEpigramDetailQuery, usePostEpigramLikeDeleteMutation, usePostEpigramLikeMutation } from '../../hooks/useEpigramQuery';
import ico_bookmark_gray from '../../assets/ico_bookmark_gray.svg';
import ico_bookmark_purple from '../../assets/ico_bookmark_purple.svg';
import { Menu } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import alertMessage from '../AlertMessage';

interface LikeButtonProps {
  id: number;
}

function LikeButton({ id }: LikeButtonProps) {
  const { data } = useGetEpigramDetailQuery(id);
  const [liked, setLiked] = useState<boolean>(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data) {
      setLiked(data.isLiked);
    }
  }, [data]);

  const options = {
    onError: () => {
      alertMessage({ title: '실패했습니다.', message: '죄송합니다. 다시 시도해주세요.', color: 'red' });
    },
    onSettled: () => {
      queryClient.invalidateQueries();
      if (data) {
        setLiked(data.isLiked);
      }
    },
  };

  const likeMutation = usePostEpigramLikeMutation(id, options);
  const deleteLikeMutation = usePostEpigramLikeDeleteMutation(id, options);

  const onClickLikeButton = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    if (data) {
      if (!data.isLiked) {
        likeMutation.mutate();
      } else {
        deleteLikeMutation.mutate();
      }
    }
  };

  return (
    <Menu trigger='hover' position='top' offset={1} openDelay={500}>
      <Menu.Target>
        <button onClick={(e) => onClickLikeButton(e)} className={`w-[20px] tablet:w-[24px] rounded-full p-[2px] absolute right-[12px] top-[-10px]`}>
          <img src={liked ? ico_bookmark_purple : ico_bookmark_gray} alt='좋아요' />
        </button>
      </Menu.Target>
      <Menu.Dropdown className='rounded-[10px]'>
        <Menu.Item className='text-xs p-[5px]'>{liked ? '좋아요 취소' : '좋아요'}</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default LikeButton;
