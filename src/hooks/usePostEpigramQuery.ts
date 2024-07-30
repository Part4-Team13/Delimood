import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import * as z from 'zod';
import { epigramResponse } from '../../schema/epigram/EpigramPost';
import { likeEpigram } from '../apis/epigram/EpigramPost';

// useLikeEpigramQuery 훅
export const useLikeEpigramQuery = (teamId: number, epigramId: number, data: z.infer<typeof epigramRequest>, options?: UseQueryOptions<z.infer<typeof epigramResponse>, AxiosError>) => {
  return useQuery<z.infer<typeof epigramResponse>, AxiosError>({
    queryKey: ['likeEpigram', teamId, epigramId],
    queryFn: () => likeEpigram(teamId, epigramId, data),
    ...options,
  });
};
