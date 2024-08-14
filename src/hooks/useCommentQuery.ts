import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PostCommentType, PatchCommentType, DeleteCommentType, ListItemType, GetCommentsRequestType } from '../schema/commentSchema';
import { postComment, patchComment, deleteComment } from '../apis/comment';
import { MutationOptions } from '../types/query';
import quries from '../apis/queries';

type UsePostCommentMutationParams = {
  epigramId: number;
  options: MutationOptions<PostCommentType, ListItemType>;
};

type UsePatchCommentMutationParams = {
  epigramId: number;
  options: MutationOptions<{ id: number; data: PatchCommentType }, ListItemType>;
};

type UseDeleteCommentMutationParams = MutationOptions<DeleteCommentType, { id: number }>;

// 댓글 등록
export const usePostCommentMutation = ({ epigramId, options }: UsePostCommentMutationParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postComment,
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: quries.comments.getComments({ epigramId, cursor: 0 }).queryKey,
      });
      if (options?.onSuccess) {
        options.onSuccess(...args);
      }
    },
  });
};

// 댓글 목록 조회
export const useGetCommentsQuery = (params: GetCommentsRequestType) => {
  return useQuery(quries.comments.getComments(params));
};

// 댓글 수정
export const usePatchCommentMutation = ({ epigramId, options }: UsePatchCommentMutationParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: PatchCommentType }) => patchComment(id, data),
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: quries.comments.getComments({ epigramId, cursor: 0 }).queryKey,
      });

      if (options?.onSuccess) {
        options.onSuccess(...args);
      }
    },
  });
};

// 댓글 삭제
export const useDeleteCommentMutation = (options: UseDeleteCommentMutationParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteComment,
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: quries.comments.getComments({}).queryKey,
      });

      if (options?.onSuccess) {
        options.onSuccess(...args);
      }
    },
  });
};
