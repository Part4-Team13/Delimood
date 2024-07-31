import * as z from 'zod';
import { fetchFromApi } from '../common';
import { epigramDetailType, cursorBasedPaginationResponse_CommentType_, cursorBasedPaginationResponse_EpigramListType_ } from '../../schema/epigram/EpigramGet';

// 에피그램 목록 조회 GET 요청
export const getEpigrams = async (): Promise<z.infer<typeof cursorBasedPaginationResponse_EpigramListType_>> => {
  const url = `/epigrams`;
  return fetchFromApi(url, cursorBasedPaginationResponse_EpigramListType_, 'get');
};

// 오늘의 에피그램 조회 GET 요청
export const getTodayEpigram = async (): Promise<z.infer<typeof epigramDetailType>> => {
  const url = `/epigrams/today`;
  return fetchFromApi(url, epigramDetailType, 'get');
};

// 에피그램 상세 조회 GET 요청
export const getEpigramDetail = async (epigramId: number): Promise<z.infer<typeof epigramDetailType>> => {
  const url = `/epigrams/${epigramId}`;
  return fetchFromApi(url, epigramDetailType, 'get');
};

// 에피그램 댓글 목록 조회 GET 요청
export const getEpigramComments = async (epigramId: number): Promise<z.infer<typeof cursorBasedPaginationResponse_CommentType_>> => {
  const url = `/epigrams/${epigramId}/comments`;
  return fetchFromApi(url, cursorBasedPaginationResponse_CommentType_, 'get');
};
