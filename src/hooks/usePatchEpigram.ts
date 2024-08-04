import { useMutation, useQueryClient, MutationOptions } from '@tanstack/react-query';
import { updateEpigram } from '../apis/epigram/EpigramPatch';
import { UpdateEpigramBodyType } from '../schema/epigram/EpigramPatch';

// 에피그램 수정 PATCH 훅
export const useUpdateEpigram = (options: MutationOptions<void, Error, { id: number; data: UpdateEpigramBodyType }> = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateEpigramBodyType }) => updateEpigram(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['epigrams'] });
      queryClient.invalidateQueries({ queryKey: ['epigramDetail', variables.id] });
    },
    ...options,
  });
};
