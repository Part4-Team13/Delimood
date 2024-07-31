import * as z from 'zod';
import { fetchFromApi } from '../common';
import { deleteEpigramResponse } from '../../schema/epigram/EpigramDelete';
import { epigramDetailType } from '../../schema/epigram/EpigramDelete';

// 에피그램 삭제 DELETE 요청
export const deleteEpigram = async (epigramId: number): Promise<z.infer<typeof deleteEpigramResponse>> => {
  const url = `/epigrams/${epigramId}`;
  return fetchFromApi(url, deleteEpigramResponse, 'delete');
};

// 좋아요 취소 DELETE 요청
export const cancelLikeEpigram = async (epigramId: number): Promise<z.infer<typeof epigramDetailType>> => {
  const url = `/epigrams/${epigramId}/like`;
  return fetchFromApi(url, epigramDetailType, 'delete');
};
