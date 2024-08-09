import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PostCommentType, PatchCommentType, DeleteCommentType, ListItemType, GetCommentsRequestType } from '../schema/commentSchema';
import { postComment, patchComment, deleteComment } from '../apis/comment';
import { MutationOptions } from '../types/query';
import quries from '../apis/queries';

// 댓글 등록
export const usePostCommentMutation = (options: MutationOptions<PostCommentType, ListItemType>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postComment,
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      if (options?.onSuccess) {
        options.onSuccess(...args);
      }
    },
  });
};
// NOTE: 사용 방법
// const mutation = usePostCommentMutation({
//   onSuccess: (data) => {
//     // 댓글 등록 후 실행할 코드
//   },
// });
// mutation.mutate({ epigramId: 1, isPrivate: false, content: '댓글 내용' });

// 댓글 목록 조회
export const useGetCommentsQuery = (params: GetCommentsRequestType) => {
  return useQuery(quries.comments.getComments(params));
};
// NOTE: 사용 방법
// const { data, error, isLoading } = useGetCommentsQuery({ epigramId: 1, limit: 10, cursor: 0 });

// 댓글 수정
export const usePatchCommentMutation = (options: MutationOptions<{ id: number; data: PatchCommentType }, ListItemType>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: PatchCommentType }) => patchComment(id, data),
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      if (options?.onSuccess) {
        options.onSuccess(...args);
      }
    },
  });
};
// NOTE: 사용 방법
// const mutation = usePatchCommentMutation({
//   onSuccess: (data) => {
//     // 댓글 수정 후 실행할 코드
//   },
// });
// mutation.mutate({ id: 1, data: { isPrivate: false, content: '수정된 댓글 내용' } });

// 댓글 삭제
export const useDeleteCommentMutation = (options: MutationOptions<DeleteCommentType, { id: number }>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteComment,
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      if (options?.onSuccess) {
        options.onSuccess(...args);
      }
    },
  });
};
// NOTE: 사용 방법
// const mutation = useDeleteCommentMutation({
//   onSuccess: (data) => {
//     // 댓글 삭제 후 실행할 코드
//   },
// });
// mutation.mutate({ id: 1 });
