import * as z from 'zod';
import { createEpigram, epigramList, epigramDetail } from '../../schema/epigram/EpigramPost';
import { fetchFromApi } from '../common';

// 에피그램 작성 POST 요청
export const createEpigramRequest = async (data: z.infer<typeof createEpigram>): Promise<z.infer<typeof epigramList>> => {
  const validatedData = createEpigram.parse(data);
  return fetchFromApi('/epigrams', epigramList, 'post', validatedData);
};

// 에피그램 좋아요 POST 요청
export const likeEpigram = async (epigramId: number, data: z.infer<typeof epigramDetail>): Promise<z.infer<typeof epigramDetail>> => {
  const validatedData = epigramDetail.parse(data);
  return fetchFromApi(`/epigrams/${epigramId}/like`, epigramDetail, 'post', validatedData);
};
