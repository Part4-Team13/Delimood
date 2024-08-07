import React from 'react';
import CommentCard from './CommentCard';

export interface CommentProps {
  id: number;
  epigramId: number;
  writer: {
    id: number;
    image: string | null;
    nickname: string;
  };
  updatedAt: string;
  createdAt: string;
  isPrivate: boolean;
  content: string;
}

interface CommentListProps {
  commentList: CommentProps[];
}

const MemoizedCard = React.memo(CommentCard);

function CommentList({ commentList }: CommentListProps) {
  return (
    <div className='bg-background'>
      <ul className='mx-auto bg-yellow-300 w-fit'>
        {commentList.map((comment) => (
          <li key={comment.id}>
            <MemoizedCard updatedAt={comment.updatedAt} content={comment.content} writer={comment.writer} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentList;
