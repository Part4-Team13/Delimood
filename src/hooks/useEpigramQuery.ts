import { useQuery, useMutation, UseQueryOptions, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import {
  PostEpigramRequestType,
  PostEpigramResponseType,
  GetEpigramListResponseType,
  EpigramDetailType,
  UpdateEpigramRequestType,
  DeleteResponseType,
  PaginationResponseType,
  ErrorResponseType,
  PaginationRequest,
} from '../schema/epigramSchema';
import { postEpigram, getEpigramList, getTodayEpigram, getEpigramDetail, postEpigramLike, postEpigramLikeDelete, updateEpigram, deleteEpigram, getCommentList, ErrorResponse } from '../apis/epigram';
import quries from '../apis/queries';

// 에피그램 작성
export const usePostEpigramMutation = (options: UseMutationOptions<PostEpigramResponseType, unknown, PostEpigramRequestType> = {}) => {
  return useMutation({
    mutationFn: postEpigram,
    ...options,
  });
};

// 에피그램 목록 조회
export const useGetEpigramListQuery = (params: PaginationRequest, options?: UseQueryOptions<GetEpigramListResponseType>) => {
  return useQuery<GetEpigramListResponseType>({
    queryKey: quries.epigrams.list(params).queryKey,
    queryFn: () => getEpigramList(params),
    ...options,
  });
};

// 오늘의 에피그램 조회
export const useGetTodayEpigramQuery = (options?: UseQueryOptions<EpigramDetailType>) => {
  return useQuery<EpigramDetailType>({
    queryKey: quries.epigrams.todayEpigram().queryKey,
    queryFn: getTodayEpigram,
    ...options,
  });
};

// 에피그램 상세 조회
export const useGetEpigramDetailQuery = (id: number, options?: UseQueryOptions<EpigramDetailType>) => {
  return useQuery<EpigramDetailType>({
    queryKey: quries.epigrams.detailEpigram(id).queryKey,
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
  const queryClient = useQueryClient();
  return useMutation<EpigramDetailType, unknown, UpdateEpigramRequestType>({
    mutationFn: (data: UpdateEpigramRequestType) => updateEpigram(id, data),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: quries.epigrams.detailEpigram(id).queryKey });
      queryClient.invalidateQueries({ queryKey: quries.epigrams.list({ limit: 10, cursor: undefined }).queryKey });
      if (options?.onSuccess) {
        options.onSuccess(...args);
      }
    },
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
export const useGetCommentListQuery = (id: number, paginationRequest: PaginationRequest, options?: UseQueryOptions<PaginationResponseType>) => {
  return useQuery<PaginationResponseType>({
    queryKey: quries.epigrams.comments(id, paginationRequest).queryKey,
    queryFn: () => getCommentList(id, paginationRequest),
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
