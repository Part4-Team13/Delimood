import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { deleteEpigram, cancelLikeEpigram } from '../apis/epigram/EpigramDelete';
import { DeleteEpigramResponseType, DeleteEpigramDetailType } from '../schema/epigram/EpigramDelete';

// 에피그램 삭제
export const useDeleteEpigram = (options: Omit<UseMutationOptions<DeleteEpigramResponseType, unknown, number>, 'mutationFn'> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEpigram,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['epigrams'] });
      queryClient.removeQueries({ queryKey: ['epigramDetail', variables] });
      if (options.onSuccess) {
        options.onSuccess(data, variables, undefined);
      }
    },
    ...options,
  });
};

// 에피그램 좋아요 취소
export const useCancelLikeEpigram = (options: Omit<UseMutationOptions<DeleteEpigramDetailType, unknown, number>, 'mutationFn'> = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelLikeEpigram,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['epigrams'] });
      queryClient.setQueryData(['epigramDetail', variables], data);
      if (options.onSuccess) {
        options.onSuccess(data, variables, undefined);
      }
    },
    ...options,
  });
};
