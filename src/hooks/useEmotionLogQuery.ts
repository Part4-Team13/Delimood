import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import quries from '../apis/queries';
import { EmotionLogRequestType } from '../schema/emotionLogSchema';
import { postEmotionLog } from '../apis/emotionLog';
import { MutationOptions } from '../types/query';
import { EmotionLogQueryParamsType } from '../schema/emotionLogSchema';

// 오늘의 감정 등록
export const usePostEmotionLog = (params: EmotionLogQueryParamsType, options: MutationOptions<EmotionLogRequestType>) => {
  const queryClient = useQueryClient();
  const { userId } = params;

  return useMutation({
    mutationFn: (request: EmotionLogRequestType) => postEmotionLog(request),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(quries.emotionLogs.monthly(params));
      queryClient.invalidateQueries(quries.emotionLogs.today({ userId }));
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });
};

// 오늘의 감정 조회
export const useGetTodayEmotionLog = (params: EmotionLogQueryParamsType) => {
  const { queryKey, queryFn } = quries.emotionLogs.today(params);

  return useSuspenseQuery({
    queryKey,
    queryFn,
  });
};

// 월간 감정 조회
export const useGetMonthlyEmotionLogs = (params: EmotionLogQueryParamsType) => {
  return useSuspenseQuery(quries.emotionLogs.monthly(params));
};
