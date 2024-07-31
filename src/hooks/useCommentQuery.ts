// useCommentQuery.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PostCommentType, ResponseType, PatchCommentType, DeleteCommentType, ListItemType } from '../schema/commentSchema';
import { postComment, getComments, patchComment, deleteComment } from '../apis/comment';
import { MutationOptions } from '../types/query';

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

// 댓글 목록 조회
export const useGetCommentsQuery = (params: { epigramId: number; cursor?: number }) => {
  return useQuery<ResponseType>({
    queryKey: ['comments', params],
    queryFn: () => getComments(params),
  });
};

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
