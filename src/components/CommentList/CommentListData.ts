import { useGetCommentsQuery } from '../../hooks/useCommentQuery';
import { useGetCommentListQuery } from '../../hooks/useEpigramQuery';

// 전체 댓글 불러오기
export const AllCommentListData = (limit: number, cursor: number | null) => {
  const query = cursor ? { limit, cursor } : { limit };
  const { data, isLoading } = useGetCommentsQuery(query);
  return { data, isLoading };
};

// 내 댓글만 불러오기
export const MyCommentListData = () => {
  const { data, isLoading } = { data: [], isLoading: false };
  return { data, isLoading };
};

// 특정 에피그램 댓글만 불러오기
export const SpecificCommentListData = (id: number, limit: number, cursor: number | null) => {
  const query = cursor ? { limit, cursor } : { limit };
  const { data, isLoading } = useGetCommentListQuery(id, query);
  return { data, isLoading };
};
