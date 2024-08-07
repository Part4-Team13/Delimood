import React, { useState, useEffect, useRef } from 'react';
import { useGetCommentListQuery } from '../../hooks/useEpigramQuery';
import CommentList, { CommentProps } from './CommentList';
import { useQueryClient } from '@tanstack/react-query';
import quries from '../../apis/queries';

interface CommentListWithInfiniteScrollProps {
  id: number;
}

function CommentListWithInfiniteScroll({ id }: CommentListWithInfiniteScrollProps) {
  const LIMIT = 5;
  const [commentList, setCommentList] = useState<CommentProps[]>([]);
  const [nextCursor, setNextCursor] = useState<number | undefined>();
  const [hasMore, setHasMore] = useState<boolean>(false);
  const loader = useRef<HTMLDivElement | null>(null);

  const { data } = useGetCommentListQuery(id, { limit: LIMIT, cursor: nextCursor });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (data) {
      const comments = data.list;
      setCommentList((prev) => [...prev, ...comments]);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      if (commentList.length >= data.totalCount) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    }
  }, [data, commentList]);

  useEffect(() => {
    if (data) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && hasMore) {
              const parsedCursor = data.nextCursor !== null ? data.nextCursor : undefined;
              setNextCursor(parsedCursor);

              observer.unobserve(entry.target);
              if (loader.current) observer.observe(loader.current);
              queryClient.removeQueries({ queryKey: quries.epigrams.comments(id, { limit: LIMIT, cursor: nextCursor }).queryKey });
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
  }, [data, hasMore, id, nextCursor, queryClient]);

  return (
    <>
      <CommentList commentList={commentList} />
      {hasMore && (
        <div ref={loader} id='loader'>
          Loading...
        </div>
      )}
    </>
  );
}

export default CommentListWithInfiniteScroll;
