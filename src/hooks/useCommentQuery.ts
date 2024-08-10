import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PostCommentType, PatchCommentType, DeleteCommentType, ListItemType, GetCommentsRequestType } from '../schema/commentSchema';
import { postComment, patchComment, deleteComment } from '../apis/comment';
import { MutationOptions } from '../types/query';
import quries from '../apis/queries';

// 댓글 등록
export const usePostCommentMutation = (epigramId: number, limit: number, options: MutationOptions<PostCommentType, ListItemType>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postComment,
    ...options,
    onSuccess: (...args) => {
      const requestParams: GetCommentsRequestType = {
        epigramId,
        limit,
        cursor: 0,
      };
      queryClient.invalidateQueries({
        queryKey: quries.comments.getComments(requestParams).queryKey,
      });
      if (options?.onSuccess) {
        options.onSuccess(...args);
      }
    },
  });
};
// NOTE: 사용 방법
/*
const { mutate: postComment, isLoading, isError, isSuccess } = usePostCommentMutation(1(예시 에피그램 아이디값), 10(예시 리밋값), {
  onSuccess: (data) => {
   // 댓글이 성공적으로 등록된 후 실행할 코드
    console.log('댓글이 성공적으로 등록되었습니다:', data);
  },
  onError: (error) => {
  // 댓글 등록 중 오류가 발생한 경우 실행할 코드
    console.error('댓글 등록 중 오류가 발생했습니다:', error);
  },
});

// 댓글 등록 호출
const handlePostComment = () => {
  postComment({
    epigramId: 1,
    isPrivate: false,
    content: '새로운 댓글 내용',
  });
};
*/

// 댓글 목록 조회
export const useGetCommentsQuery = (params: GetCommentsRequestType) => {
  return useQuery(quries.comments.getComments(params));
};
// NOTE: 사용 방법
// const { data, error, isLoading } = useGetCommentsQuery({ limit: 10, cursor: 0 });

// 댓글 수정
export const usePatchCommentMutation = (epigramId: number, limit: number, options: MutationOptions<{ id: number; data: PatchCommentType }, ListItemType>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: PatchCommentType }) => patchComment(id, data),
    ...options,
    onSuccess: (...args) => {
      const requestParams: GetCommentsRequestType = {
        epigramId,
        limit,
        cursor: 0,
      };

      queryClient.invalidateQueries({
        queryKey: quries.comments.getComments(requestParams).queryKey,
      });

      if (options?.onSuccess) {
        options.onSuccess(...args);
      }
    },
  });
};
// NOTE: 사용 방법
/*
const mutation = usePatchCommentMutation(1(예시 에피그램 아이디값), 10(예시 리밋값), {
  onSuccess: (data) => {
    // 댓글이 성공적으로 수정된 후 실행할 코드
    console.log('댓글이 성공적으로 수정되었습니다:', data);
  },
  onError: (error) => {
    // 댓글 수정 중 오류가 발생한 경우 실행할 코드
    console.error('댓글 수정 중 오류가 발생했습니다:', error);
  },
});

// 댓글 수정 호출
const handlePatchComment = () => {
  mutation.mutate({
    id: 1, // 수정할 댓글의 ID
    data: {
      isPrivate: false,
      content: '수정된 댓글 내용',
    },
  });
};
*/

// 댓글 삭제
export const useDeleteCommentMutation = (epigramId: number, limit: number, options: MutationOptions<DeleteCommentType, { id: number }>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteComment,
    ...options,
    onSuccess: (...args) => {
      const requestParams: GetCommentsRequestType = {
        epigramId,
        limit,
        cursor: 0, // 기본값으로 설정하거나 필요한 경우 조정
      };

      queryClient.invalidateQueries({
        queryKey: quries.comments.getComments(requestParams).queryKey,
      });

      if (options?.onSuccess) {
        options.onSuccess(...args);
      }
    },
  });
};
// NOTE: 사용 방법
/*
const mutation = useDeleteCommentMutation(1, 10, {
  onSuccess: (data) => {
    // 댓글이 성공적으로 삭제된 후 실행할 코드
    console.log('댓글이 성공적으로 삭제되었습니다:', data);
  },
  onError: (error) => {
    // 댓글 삭제 중 오류가 발생한 경우 실행할 코드
    console.error('댓글 삭제 중 오류가 발생했습니다:', error);
  },
});

// 댓글 삭제 호출
const handleDeleteComment = (id: number) => {
  mutation.mutate({ id }); // 삭제할 댓글의 ID
};
*/
