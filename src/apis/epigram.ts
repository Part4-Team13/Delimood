import {
  PostEpigramRequestType,
  PostEpigramResponseType,
  GetEpigramListResponseType,
  EpigramDetailType,
  UpdateEpigramRequestType,
  DeleteResponseType,
  PaginationResponseType,
  ErrorResponseType,
} from '../schema/epigramSchema';

import httpClient from '.';

// Post 에피그램 작성
export const postEpigram = async (data: PostEpigramRequestType): Promise<PostEpigramResponseType> => {
  const response = await httpClient.post(`/epigrams`, data);
  return response.data;
};

// 에피그램 목록 조회
export const getEpigramList = async (limit: number, cursor: number | null = null): Promise<GetEpigramListResponseType> => {
  let queries = `limit=${limit}`;
  if (cursor !== null) {
    queries += `&cursor=${cursor}`;
  }
  const response = await httpClient.get(`/epigrams?${queries}`);
  return response.data;
};

// 오늘의 에피그램 조회
export const getTodayEpigram = async (): Promise<EpigramDetailType> => {
  const response = await httpClient.get(`/epigrams/today`);
  return response.data;
};

// 에피그램 상세 조회
export const getEpigramDetail = async (id: number): Promise<EpigramDetailType> => {
  const response = await httpClient.get(`/epigram/${id}`);
  return response.data;
};

// 에피그램 좋아요
export const postEpigramLike = async (id: number): Promise<EpigramDetailType> => {
  const response = await httpClient.post(`/epigram/${id}/like`);
  return response.data;
};

// 에피그램 좋아요 취소
export const postEpigramLikeDelete = async (id: number): Promise<EpigramDetailType> => {
  const response = await httpClient.delete(`/epigram/${id}/like`);
  return response.data;
};

// 에피그램 수정
export const updateEpigram = async (id: number, data: UpdateEpigramRequestType): Promise<EpigramDetailType> => {
  const response = await httpClient.patch(`/epigrams/${id}`, data);
  return response.data;
};

// 에피그램 삭제
export const deleteEpigram = async (id: number): Promise<DeleteResponseType> => {
  const response = await httpClient.delete(`/epigrams/${id}`);
  return response.data;
};

// 에피그램 댓글 목록 조회
export const getCommentList = async (id: number, limit: number, cursor: number | null = null): Promise<PaginationResponseType> => {
  let queries = `limit=${limit}`;
  if (cursor !== null) {
    queries += `&cursor=${cursor}`;
  }
  const response = await httpClient.get(`/epigrams/${id}/comments?${queries}`);
  return response.data;
};

// 403, 404 에러 응답 처리
export const ErrorResponse = async (): Promise<ErrorResponseType> => {
  const response = await httpClient.get('/error');
  return response.data;
};
