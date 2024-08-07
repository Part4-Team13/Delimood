import { useEffect, useState } from 'react';
import { useGetCommentListQuery } from '../../hooks/useEpigramQuery';
import ViewMore from '../ViewMore';
import { useQueryClient } from '@tanstack/react-query';
import quries from '../../apis/queries';
import CommentList, { CommentProps } from './CommentList';

interface CommentListWithButtonProps {
  id: number;
}

function CommentListWithButton({ id }: CommentListWithButtonProps) {
  const LIMIT = 4;
  const [commentList, setCommentList] = useState<CommentProps[]>([]);
  const [nextCursor, setNextCursor] = useState<number | undefined>(undefined);
  const [showButton, setShowButton] = useState(false);

  const { data, isLoading } = useGetCommentListQuery(id, { limit: LIMIT, cursor: nextCursor });

  const queryClient = useQueryClient();

  // 리렌더 시 이전 리스트+새로 불러온 리스트 합친 리스트 표시
  useEffect(() => {
    if (data) {
      const comments = data.list;
      setCommentList((prev) => {
        const newList = [...prev, ...comments];
        setShowButton(!(data.totalCount == newList.length));
        return newList;
      });
    }
  }, [data]);

  // 이전에 사용했던 쿼리 키 정리
  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: quries.epigrams.comments(id, { limit: LIMIT }).queryKey });
    };
  }, [id, queryClient, nextCursor]);

  // 더보기 버튼 클릭 함수
  const handleClickViewMore = () => {
    if (data) {
      const parsedCursor = data.nextCursor !== null ? data.nextCursor : undefined;
      setNextCursor(parsedCursor);
    }
  };

  return (
    <>
      <CommentList commentList={commentList} />
      {showButton && (
        <div className='flex justify-center mt-[40px] desktop:mt-[70px]'>
          <ViewMore disabled={isLoading} text='내 댓글 더보기' onClick={handleClickViewMore} />
        </div>
      )}
    </>
  );
}

export default CommentListWithButton;
