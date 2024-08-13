import { useEffect, useRef, useState } from 'react';
import CommentCard from './CommentCard';
import ViewMore from '../ViewMore';
import { InfiniteData } from '@tanstack/react-query';
import { ListItemType, ResponseType } from '../../schema/commentSchema';

interface CommentListProps {
  data: InfiniteData<ResponseType> | undefined;
  fetchNextPage: () => void;
  isFetching: boolean;
  userId?: number;
  isInfiniteScroll?: boolean;
  buttonText?: string;
}

function CommentList({ data, fetchNextPage, isFetching, userId, isInfiniteScroll = false, buttonText = '더보기' }: CommentListProps) {
  const [commentList, setCommentList] = useState<ListItemType[]>([]);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const loader = useRef(null);

  useEffect(() => {
    if (data) {
      const allComments = data.pages.flatMap((page) => page.list || []);
      setCommentList(() => {
        data.pages[0].totalCount === allComments.length ? setLoadMore(false) : setLoadMore(true);
        return allComments;
      });
    }
  }, [data]);

  useEffect(() => {
    if (data && isInfiniteScroll && loadMore && !isFetching) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && loadMore) {
              fetchNextPage();
              observer.unobserve(entry.target);
              if (loader.current) observer.observe(loader.current);
            }
          });
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 1.0,
        },
      );

      const currentLoader = loader.current;

      if (currentLoader) {
        observer.observe(currentLoader);
      }

      return () => {
        if (currentLoader) {
          observer.unobserve(currentLoader);
        }
      };
    }
  }, [data, fetchNextPage, loadMore, isInfiniteScroll, isFetching]);

  return (
    <div>
      <ul className='mx-auto bg-yellow-300 w-fit'>
        {commentList &&
          commentList.map((comment) => (
            <li key={comment.id}>
              <CommentCard userId={userId} id={comment.id} updatedAt={comment.updatedAt} content={comment.content} writer={comment.writer} isPrivate={comment.isPrivate} />
            </li>
          ))}
      </ul>
      {!isInfiniteScroll ? (
        loadMore && (
          <div className='flex justify-center mt-[40px] desktop:mt-[70px]'>
            <ViewMore onClick={fetchNextPage} text={buttonText} disabled={isFetching} />
          </div>
        )
      ) : (
        <div ref={loader} id='loader' className='flex justify-center mt-[40px] desktop:mt-[70px]' />
      )}
    </div>
  );
}

export default CommentList;
