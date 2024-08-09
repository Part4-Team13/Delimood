import React from 'react';
import CommentCard from './CommentCard';
import { ListItemType } from '../../schema/commentSchema';
import { CommentList } from '.';

export interface CommentProps {
  id: number;
  epigramId: number;
  writer: {
    id: number;
    image: string | null;
    nickname: string;
  };
  updatedAt: string | Date;
  createdAt: string | Date;
  isPrivate: boolean;
  content: string;
}

interface CommentListStyleProps {
  commentList: ListItemType[] | CommentList[];
}

const MemoizedCard = React.memo(CommentCard);

function CommentListStyle({ commentList }: CommentListStyleProps) {
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

export default CommentListStyle;
