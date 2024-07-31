import { PostCommentType, ResponseType, PatchCommentType, DeleteCommentType, ListItemType } from '../schema/commentSchema';
import httpClient from '.';

// 댓글 등록
export const postComment = async (request: PostCommentType): Promise<ListItemType> => {
  const response = await httpClient.post('/comments', request);
  return response.data;
};

// 댓글 목록 조회
export const getComments = async (params: { epigramId: number; cursor?: number }): Promise<ResponseType> => {
  const { epigramId, cursor } = params;
  const response = await httpClient.get('/comments', {
    params: { epigramId, cursor },
  });
  return response.data;
};

// 댓글 수정
export const patchComment = async (id: number, request: PatchCommentType): Promise<ListItemType> => {
  const response = await httpClient.patch(`/comments/${id}`, request);
  return response.data;
};

// 댓글 삭제
export const deleteComment = async (request: DeleteCommentType): Promise<{ id: number }> => {
  const response = await httpClient.delete(`/comments/${request.id}`);
  return response.data;
};
