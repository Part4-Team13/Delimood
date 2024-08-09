import { useEffect, useState } from 'react';
import { ListItemType, ResponseType } from '../../schema/commentSchema';
import { AllCommentListData, SpecificCommentListData } from './CommentListData';
import { Comment, PaginationResponseType } from '../../schema/epigramSchema';
import CommentListWithButton from './CommentListWithButton';
import { z } from 'zod';
import { useQueryClient } from '@tanstack/react-query';
import quries from '../../apis/queries';
import CommentListWithInfiniteScroll from './CommentListWithInfiniteScroll';

type CommentListProps = {
  isInfiniteScroll?: boolean;
} & ({ id: number; isMine?: never } | { id?: never; isMine?: boolean });

export type CommentList = z.infer<typeof Comment>;

function CommentList_({ id, isMine = false, isInfiniteScroll = false }: CommentListProps) {
  const LIMIT = 4;
  const [cursor, setCursor] = useState<number | null>(null);
  const [list, setList] = useState<ListItemType[] | CommentList[]>([]);
  const [moreList, setMoreList] = useState<boolean>(false);

  const queryClient = useQueryClient();

  // data, isLoading 초기화
  let data: ResponseType | PaginationResponseType | undefined;
  let isLoading: boolean = false;

  // buttonText 초기화
  let buttonText: string;

  // 받은 prop에 따른 list 변화
  if (id !== undefined) {
    // NOTE : id가 있을 때, 특정 게시글의 댓글 리스트 불러옴
    ({ data, isLoading } = SpecificCommentListData(id, LIMIT, cursor));
    buttonText = '댓글 더보기';
  } else if (isMine !== false) {
    // NOTE : isMine이 true일 때, 로그인한 유저의 댓글 리스트를 불러옴(구현예정)
    // const { data, isLoading } = MyCommentListData();
    // buttonText = '내 댓글 더보기'
  } else {
    // NOTE : 전부 false일 때, 전체 댓글 리스트를 불러옴
    ({ data, isLoading } = AllCommentListData(LIMIT, cursor));
    buttonText = '최신 댓글 더보기';
  }

  // 리스트 추가 및 더보기버튼 표현 설정
  useEffect(() => {
    if (data) {
      setList((prev) => {
        const newList = [...prev, ...data.list];
        setMoreList(!(data.totalCount == newList.length));
        return newList;
      });
    }
  }, [data]);

  // 보여주는 리스트에 따른 쿼리 삭제문
  useEffect(() => {
    return () => {
      const params = cursor ? { limit: LIMIT, cursor } : { limit: LIMIT };
      if (id !== undefined) {
        queryClient.removeQueries({ queryKey: quries.epigrams.comments(id, params).queryKey });
      } else if (isMine !== false) {
        // queryClient.removeQueries()
      } else {
        queryClient.removeQueries({ queryKey: quries.comments.getComments(params).queryKey });
      }
    };
  }, [cursor, id, isMine, queryClient]);

  if (isInfiniteScroll) {
    // 무한 스크롤 형식으로 보여줌
    return <CommentListWithInfiniteScroll data={data} commentList={list} setCursor={setCursor} loadMore={moreList} />;
  } else {
    // 더보기 버튼 형식으로 보여줌
    return <CommentListWithButton data={data} commentList={list} isLoading={isLoading} setCursor={setCursor} showButton={moreList} buttonText={buttonText} />;
  }
}

export default CommentList_;

/**
 *  <CommentList id={} /> : 특정 에피그램 댓글 리스트 , 더보기 버튼 형식
 *  <CommentList isMine /> : 내가 작성한 댓글 리스트 , 더보기 버튼 형식
 *  <CommentList /> : 전체 댓글 리스트 , 더보기 버튼 형식
 *  isInfiniteScroll prop 추가 시 무한 스크롤 형태로 보여줌
 */
