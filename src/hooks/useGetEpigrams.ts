import { useQuery } from '@tanstack/react-query';
import { getEpigrams, getTodayEpigram, getEpigramDetail, getEpigramComments } from '../apis/epigram/EpigramGet';

//에피그램 목록 조회
export const useGetEpigrams = (limit: number, cursor: number | null, options = {}) => {
  return useQuery({
    queryKey: ['epigrams', { limit, cursor }],
    queryFn: () => getEpigrams(limit, cursor),
    ...options,
  });
};

// 오늘의 에피그램
export const useGetTodayEpigram = (options = {}) => {
  return useQuery({
    queryKey: ['todayEpigram'],
    queryFn: getTodayEpigram,
    ...options,
  });
};

// 에피그램 상세 조회
export const useGetEpigramDetail = (epigramId: number, options = {}) => {
  return useQuery({
    queryKey: ['epigramDetail', epigramId],
    queryFn: () => getEpigramDetail(epigramId),
    ...options,
  });
};

// 에피그램 댓글 목록 조회
export const useGetEpigramComments = (epigramId: number, options = {}) => {
  return useQuery({
    queryKey: ['epigramComments', epigramId],
    queryFn: () => getEpigramComments(epigramId),
    ...options,
  });
};
