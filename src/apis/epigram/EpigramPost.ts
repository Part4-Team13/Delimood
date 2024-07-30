import * as z from 'zod';
import { epigramRequest, epigramResponse } from '../../schema/epigram/EpigramPost';
import { fetchFromApi } from '../common';

export const likeEpigram = async (teamId: number, epigramId: number, data: z.infer<typeof epigramRequest>): Promise<z.infer<typeof epigramResponse>> => {
  const validatedData = epigramRequest.parse(data);
  return fetchFromApi(`${teamId}/epigrams/${epigramId}/like`, epigramResponse, 'post', validatedData);
};
