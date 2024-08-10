import httpClient from '../index';
import { handleError } from '../common';
import {
  epigramDetailType,
  cursorBasedPaginationResponse_CommentType_,
  cursorBasedPaginationResponse_EpigramListType_,
  EpigramDetailType,
  CursorBasedPaginationResponse_EpigramListType_,
  CursorBasedPaginationResponse_CommentType_,
} from '../../schema/epigram/EpigramGet';

// 에피그램 목록 조회 GET 요청
export const getEpigrams = async (): Promise<CursorBasedPaginationResponse_EpigramListType_> => {
  try {
    const response = await httpClient.get('/epigrams');
    return cursorBasedPaginationResponse_EpigramListType_.parse(response.data);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// 오늘의 에피그램 조회 GET 요청
export const getTodayEpigram = async (): Promise<EpigramDetailType> => {
  try {
    const response = await httpClient.get('/epigrams/today');
    return epigramDetailType.parse(response.data);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// 에피그램 상세 조회 GET 요청
export const getEpigramDetail = async (epigramId: number): Promise<EpigramDetailType> => {
  try {
    const response = await httpClient.get(`/epigrams/${epigramId}`);
    return epigramDetailType.parse(response.data);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// 에피그램 댓글 목록 조회 GET 요청
export const getEpigramComments = async (epigramId: number): Promise<CursorBasedPaginationResponse_CommentType_> => {
  try {
    const response = await httpClient.get(`/epigrams/${epigramId}/comments`);
    return cursorBasedPaginationResponse_CommentType_.parse(response.data);
  } catch (error) {
    handleError(error);
    throw error;
  }
};
