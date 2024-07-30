import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { deleteEpigram } from '../apis/epigram/EpigramDelete';
import { cancelEpigramLike } from '../apis/epigram/EpigramDelete';
import { updateEpigramBody } from '../schema/epigram/EpigramPatch';
import { updateEpigram } from '../apis/epigram/EpigramPatch';
import { likeEpigram } from '../apis/epigram/EpigramPost';
import { epigramRequest } from '../schema/epigram/EpigramPost';
import * as z from 'zod';

// 에피그램 삭제 Mutation
export const useDeleteEpigramMutation = (options?: UseMutationOptions<void, AxiosError, { teamId: number; id: number }>) => {
  return useMutation<void, AxiosError, { teamId: number; id: number }>({
    mutationFn: ({ teamId, id }) => deleteEpigram(teamId, id),
    ...options,
  });
};

// 에피그램 좋아요 취소 Mutation
export const useCancelEpigramLikeMutation = (options?: UseMutationOptions<void, AxiosError, { teamId: number; id: number }>) => {
  return useMutation<void, AxiosError, { teamId: number; id: number }>({
    mutationFn: ({ teamId, id }) => cancelEpigramLike(teamId, id),
    ...options,
  });
};

// 에피그램 수정 Mutation
export const useUpdateEpigramMutation = (options?: UseMutationOptions<void, AxiosError, { teamId: number; id: number; data: z.infer<typeof updateEpigramBody> }>) => {
  return useMutation<void, AxiosError, { teamId: number; id: number; data: z.infer<typeof updateEpigramBody> }>({
    mutationFn: ({ teamId, id, data }) => updateEpigram(teamId, id, data),
    ...options,
  });
};

// 에피그램 생성 Mutation
export const useLikeEpigramMutation = (
  options?: UseMutationOptions<
    {
      id: number;
      tags: { id: number; name: string }[];
      referenceUrl: string | null;
      referenceTitle: string | null;
      author: string;
      content: string;
      likeCount: number;
      writerId: number;
      isLiked: boolean;
    },
    AxiosError,
    { teamId: number; epigramId: number; data: z.infer<typeof epigramRequest> }
  >,
) => {
  return useMutation<
    {
      id: number;
      tags: { id: number; name: string }[];
      referenceUrl: string | null;
      referenceTitle: string | null;
      author: string;
      content: string;
      likeCount: number;
      writerId: number;
      isLiked: boolean;
    },
    AxiosError,
    { teamId: number; epigramId: number; data: z.infer<typeof epigramRequest> }
  >({
    mutationFn: ({ teamId, epigramId, data }) => likeEpigram(teamId, epigramId, data),
    ...options,
  });
};
