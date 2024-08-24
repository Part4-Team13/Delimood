import React, { useEffect, useRef, useState } from 'react';
import CommentCard from './CommentCard';
import ViewMore from '../ViewMore';
import { InfiniteData } from '@tanstack/react-query';
import { CommentResponseType, ListItemType } from '../../schema/commentSchema';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 *  const { data, fetchNextPage, isFetching } = useGetAllCommentsInfiniteQuery({ limit: 3 });
 *  const { data, fetchNextPage, isFetching } = useGetEpigramCommentsInfiniteQuery(에피그램 ID, { limit: 3 });
 *  const { data, fetchNextPage, isFetching } = useGetMyCommentInfiniteQuery({ id: 현재 로그인한 사용자의 id, limit: 3 });
 *
 *  <CommentList data={data} fetchNextPage={fetchNextPage} isFetching={isFetching} userId={현재 로그인한 사용자의 id} buttonText='최신 댓글 더보기' /> (무한스크롤 필요 시 isInfiniteScroll 추가)
 */

interface CommentListProps {
  data: InfiniteData<CommentResponseType> | undefined;
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

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onClickCard = (e: React.SyntheticEvent, epigramId: number) => {
    e.stopPropagation();
    if (pathname !== `/epigrams/${epigramId}`) {
      navigate(`/epigrams/${epigramId}`);
    }
  };

  // NOTE : 데이터 fetch 시 리스트 업데이트
  useEffect(() => {
    if (data) {
      const allComments = data.pages.flatMap((page) => page.list || []);
      setCommentList(() => {
        data.pages[0].totalCount === allComments.length ? setLoadMore(false) : setLoadMore(true);
        return allComments;
      });
    }
  }, [data]);

  // 무한스크롤 로직
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
            <li key={comment.id} onClick={(e) => onClickCard(e, comment.epigramId)} className={pathname === `/epigrams/${comment.epigramId}` ? 'cursor-default' : 'cursor-pointer hover:bg-blue-200'}>
              <CommentCard
                userId={userId}
                id={comment.id}
                createdAt={comment.createdAt}
                content={comment.content}
                writer={comment.writer}
                isPrivate={comment.isPrivate}
                pathname={pathname}
                epigramId={comment.epigramId}
              />
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
