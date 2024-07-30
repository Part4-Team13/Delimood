import * as z from 'zod';
import { fetchFromApi } from '../common';
import { EpigramDetailType, CursorBasedPaginationResponse_CommentType_, CursorBasedPaginationResponse_EpigramListType_ } from '../../schema/epigram/EpigramGet';

// 에피그램 상세 조회 GET 요청
export const getEpigramDetail = async (teamId: number, id: number): Promise<z.infer<typeof EpigramDetailType>> => {
  const url = `/teams/${teamId}/epigrams/${id}`;
  try {
    return await fetchFromApi(url, EpigramDetailType);
  } catch (error) {
    console.error('요청 실패', error);
    throw error;
  }
};

// 오늘의 에피그램 조회 GET 요청
export const getTodayEpigram = async (teamId: number): Promise<z.infer<typeof EpigramDetailType>> => {
  const url = `/teams/${teamId}/epigrams/today`;
  try {
    return await fetchFromApi(url, EpigramDetailType);
  } catch (error) {
    console.error('요청 실패', error);
    throw error;
  }
};

// 에피그램 댓글 목록 조회 GET 요청
export const getEpigramComments = async (epigramId: number, cursor?: number): Promise<z.infer<typeof CursorBasedPaginationResponse_CommentType_>> => {
  try {
    return await fetchFromApi(`/epigrams/${epigramId}/comments`, CursorBasedPaginationResponse_CommentType_, 'get', undefined, { cursor });
  } catch (error) {
    console.error('요청 실패', error);
    throw error;
  }
};

// 에피그램 목록 조회를 위한 기본 GET 요청
export const getEpigramList = async (teamId: number, cursor?: number): Promise<z.infer<typeof CursorBasedPaginationResponse_EpigramListType_>> => {
  const url = `/teams/${teamId}/epigrams`;
  try {
    return await fetchFromApi(url, CursorBasedPaginationResponse_EpigramListType_, 'get', undefined, { cursor });
  } catch (error) {
    console.error('요청 실패', error);
    throw error;
  }
};