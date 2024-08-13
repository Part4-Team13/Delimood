import { useEffect, useState } from 'react';
import CommentCard from './CommentCard';
import ViewMore from '../ViewMore';
import { InfiniteData } from '@tanstack/react-query';
import { ListItemType, ResponseType } from '../../schema/commentSchema';

interface CommentListProps {
  data: InfiniteData<ResponseType> | undefined;
  fetchNextPage: () => void;
  isFetching: boolean;
  userId?: number;
}

function CommentList({ data, fetchNextPage, isFetching, userId }: CommentListProps) {
  const [commentList, setCommentList] = useState<ListItemType[]>([]);
  const [showButton, setShowButton] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      const allComments = data.pages.flatMap((page) => page.list || []);
      setCommentList(() => {
        data.pages[0].totalCount === allComments.length ? setShowButton(false) : setShowButton(true);
        return allComments;
      });
    }
  }, [data]);

  return (
    <div className='bg-background'>
      <ul className='mx-auto bg-yellow-300 w-fit'>
        {commentList &&
          commentList.map((comment) => (
            <li key={comment.id}>
              <CommentCard userId={userId} id={comment.id} updatedAt={comment.updatedAt} content={comment.content} writer={comment.writer} />
            </li>
          ))}
      </ul>
      {showButton && (
        <div className='flex justify-center mt-[40px] desktop:mt-[70px]'>
          <ViewMore onClick={fetchNextPage} text='더보기' disabled={isFetching} />
        </div>
      )}
    </div>
  );
}

export default CommentList;
