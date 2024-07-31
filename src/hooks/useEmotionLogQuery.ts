import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PostEmotionLog, GetTodayEmotionLog, GetMonthlyEmotionLogs } from '../schema/emotionLogSchema';
import { MutationOptions } from '../types/query';
import { postEmotionLog, getTodayEmotionLog, getMonthlyEmotionLogs } from '../apis/emotionLog';

export const usePostEmotionLogMutation = (options: MutationOptions<PostEmotionLog, GetTodayEmotionLog>) => {
  const queryClient = useQueryClient();
  return useMutation<GetTodayEmotionLog, AxiosError, PostEmotionLog>({
    mutationFn: postEmotionLog,
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['emotionLogs', 'today'] });
      queryClient.invalidateQueries({ queryKey: ['emotionLogs', 'monthly'] });
      if (options?.onSuccess) {
        options.onSuccess(...args);
      }
    },
  });
};

export const useGetTodayEmotionLogQuery = () => {
  return useQuery<GetTodayEmotionLog>({
    queryKey: ['emotionLogs', 'today'],
    queryFn: getTodayEmotionLog,
  });
};

export const useGetMonthlyEmotionLogsQuery = () => {
  return useQuery<GetMonthlyEmotionLogs[]>({
    queryKey: ['emotionLogs', 'monthly'],
    queryFn: getMonthlyEmotionLogs,
  });
};
