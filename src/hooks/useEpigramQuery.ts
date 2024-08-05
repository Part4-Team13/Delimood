import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
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
import { postEpigram, getEpigramList, getTodayEpigram, getEpigramDetail, postEpigramLike, postEpigramLikeDelete, updateEpigram, deleteEpigram, getCommentList, ErrorResponse } from '../apis/epigram';

// 에피그램 작성
export const usePostEpigramMutation = (options?: UseMutationOptions<PostEpigramResponseType, unknown, PostEpigramRequestType>) => {
  return useMutation<PostEpigramResponseType, unknown, PostEpigramRequestType>({
    mutationFn: postEpigram,
    ...options,
  });
};

// 에피그램 목록 조회
export const useGetEpigramListQuery = (limit: number, cursor: number | null = null, options?: UseQueryOptions<GetEpigramListResponseType>) => {
  return useQuery<GetEpigramListResponseType>({
    queryKey: ['epigrams', { limit, cursor }],
    queryFn: () => getEpigramList(limit, cursor),
    ...options,
  });
};

// 오늘의 에피그램 조회
export const useGetTodayEpigramQuery = (options?: UseQueryOptions<EpigramDetailType>) => {
  return useQuery<EpigramDetailType>({
    queryKey: ['epigrams', 'today'],
    queryFn: getTodayEpigram,
    ...options,
  });
};

// 에피그램 상세 조회
export const useGetEpigramDetailQuery = (id: number, options?: UseQueryOptions<EpigramDetailType>) => {
  return useQuery<EpigramDetailType>({
    queryKey: ['epigram', id],
    queryFn: () => getEpigramDetail(id),
    ...options,
  });
};

// 에피그램 좋아요
export const usePostEpigramLikeMutation = (id: number, options?: UseMutationOptions<EpigramDetailType, unknown, void>) => {
  return useMutation<EpigramDetailType, unknown, void>({
    mutationFn: () => postEpigramLike(id),
    ...options,
  });
};

// 에피그램 좋아요 취소
export const usePostEpigramLikeDeleteMutation = (id: number, options?: UseMutationOptions<EpigramDetailType, unknown, void>) => {
  return useMutation<EpigramDetailType, unknown, void>({
    mutationFn: () => postEpigramLikeDelete(id),
    ...options,
  });
};

// 에피그램 수정
export const useUpdateEpigramMutation = (id: number, options?: UseMutationOptions<EpigramDetailType, unknown, UpdateEpigramRequestType>) => {
  return useMutation<EpigramDetailType, unknown, UpdateEpigramRequestType>({
    mutationFn: (data: UpdateEpigramRequestType) => updateEpigram(id, data),
    ...options,
  });
};

// 에피그램 삭제
export const useDeleteEpigramMutation = (id: number, options?: UseMutationOptions<DeleteResponseType, unknown, void>) => {
  return useMutation<DeleteResponseType, unknown, void>({
    mutationFn: () => deleteEpigram(id),
    ...options,
  });
};

// 에피그램 댓글 목록 조회
export const useGetCommentListQuery = (id: number, limit: number, cursor: number | null = null, options?: UseQueryOptions<PaginationResponseType>) => {
  return useQuery<PaginationResponseType>({
    queryKey: ['epigrams', id, 'comments', { limit, cursor }],
    queryFn: () => getCommentList(id, limit, cursor),
    ...options,
  });
};

// 에러 응답 처리
export const useErrorResponseQuery = (options?: UseQueryOptions<ErrorResponseType>) => {
  return useQuery<ErrorResponseType>({
    queryKey: ['error'],
    queryFn: ErrorResponse,
    ...options,
  });
};
