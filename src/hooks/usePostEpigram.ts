import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { createEpigramRequest, likeEpigram } from '../apis/epigram/EpigramPost';
import { CreateEpigramType, EpigramListType, epigramDetail } from '../schema/epigram/EpigramPost';
import * as z from 'zod';

// 에피그램 생성
export const useCreateEpigram = (options: Omit<UseMutationOptions<EpigramListType, unknown, CreateEpigramType>, 'mutationFn'> = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEpigramRequest,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['epigrams'] });
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
};

// 에피그램 좋아요
export const useLikeEpigram = (options: Omit<UseMutationOptions<z.infer<typeof epigramDetail>, unknown, { epigramId: number; data: z.infer<typeof epigramDetail> }>, 'mutationFn'> = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ epigramId, data }: { epigramId: number; data: z.infer<typeof epigramDetail> }) => likeEpigram(epigramId, data),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['epigrams'] });
      queryClient.setQueryData(['epigramDetail', variables.epigramId], data);
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
};
