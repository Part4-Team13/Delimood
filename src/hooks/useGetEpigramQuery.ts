import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { EpigramDetailType } from '../schema/epigram/EpigramGet';
import { getEpigramDetail } from '../apis/epigram/EpigramGet';
import { CursorBasedPaginationResponse_CommentType_ } from '../schema/epigram/EpigramGet';
import { getEpigramComments } from '../apis/epigram/EpigramGet';
import { getTodayEpigram } from '../apis/epigram/EpigramGet';
import { CursorBasedPaginationResponse_EpigramListType_ } from '../schema/epigram/EpigramGet';
import { getEpigramList } from '../apis/epigram/EpigramGet';

//에피그램 상세 조회
export const useDetailEpigramQuery = (teamId: number, id: number, options?: UseQueryOptions<EpigramDetailType, AxiosError>) => {
  return useQuery<EpigramDetailType, AxiosError>({
    queryKey: ['epigramDetail', teamId, id],
    queryFn: () => getEpigramDetail(teamId, id),
    ...options,
  });
};

//오늘의 에피그램 가져오기
export const useTodayEpigramQuery = (teamId: number, options?: UseQueryOptions<EpigramDetailType, AxiosError>) => {
  return useQuery<EpigramDetailType, AxiosError>({
    queryKey: ['todayEpigram', teamId],
    queryFn: () => getTodayEpigram(teamId),
    ...options,
  });
};

// 에피그램 목록 조회
export const useEpigramListQuery = (teamId: number, cursor?: number, options?: UseQueryOptions<CursorBasedPaginationResponse_EpigramListType_, AxiosError>) => {
  return useQuery<CursorBasedPaginationResponse_EpigramListType_, AxiosError>({
    queryKey: ['epigramList', teamId, cursor],
    queryFn: () => getEpigramList(teamId, cursor),
    ...options,
  });
};

//에피그램 댓글 목록
export const useEpigramCommentsQuery = (epigramId: number, cursor?: number, options?: UseQueryOptions<CursorBasedPaginationResponse_CommentType_, AxiosError>) => {
  return useQuery<CursorBasedPaginationResponse_CommentType_, AxiosError>({
    queryKey: ['epigramComments', epigramId, cursor],
    queryFn: () => getEpigramComments(epigramId, cursor),
    ...options,
  });
};
