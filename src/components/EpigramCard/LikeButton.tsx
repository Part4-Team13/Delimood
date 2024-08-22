import { useGetEpigramDetailQuery, usePostEpigramLikeDeleteMutation, usePostEpigramLikeMutation } from '../../hooks/useEpigramQuery';
import like from '../../assets/ico_like.svg';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import alertMessage from '../../utils/alertMessage';

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
    <button
      onClick={(e) => onClickLikeButton(e)}
      className={`w-[20px] tablet:w-[24px] rounded-full p-[2px] absolute  right-[6px] top-[6px] ${!liked ? 'bg-button-diabled hover:bg-button-hover' : 'bg-state-alert hover:bg-red'}`}
    >
      <img src={like} alt='좋아요' />
    </button>
  );
}

export default LikeButton;
