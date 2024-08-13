import React, { useEffect, useRef } from 'react';
import CommentListStyle from './CommentListStyle';
import { CommentList } from '.';
import { PaginationResponseType } from '../../schema/epigramSchema';
import { ListItemType, ResponseType } from '../../schema/commentSchema';

interface CommentListWithInfiniteScrollProps {
  data: ResponseType | PaginationResponseType | undefined;
  commentList: ListItemType[] | CommentList[];
  setCursor: React.Dispatch<React.SetStateAction<number | null>>;
  loadMore: boolean;
}

function CommentListWithInfiniteScroll({ data, commentList, setCursor, loadMore }: CommentListWithInfiniteScrollProps) {
  const loader = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (data) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && loadMore) {
              setCursor(data.nextCursor);
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
  }, [data, setCursor, loadMore]);

  return (
    <>
      <CommentListStyle commentList={commentList} />
      {loadMore && (
        <div ref={loader} id='loader'>
          Loading...
        </div>
      )}
    </>
  );
}

export default CommentListWithInfiniteScroll;
