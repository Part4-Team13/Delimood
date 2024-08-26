import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import quries from '../apis/queries';
import { EmotionLogRequestType } from '../schema/emotionLogSchema';
import { postEmotionLog } from '../apis/emotionLog';
import { MutationOptions } from '../types/query';
import { EmotionLogQueryParamsType } from '../schema/emotionLogSchema';
import { useGetMeQuery } from './useUserQuery';

// 오늘의 감정 등록
export const usePostEmotionLog = (params: EmotionLogQueryParamsType, options: MutationOptions<EmotionLogRequestType>) => {
  const queryClient = useQueryClient();
  const { data: userData } = useGetMeQuery();

  return useMutation({
    mutationFn: (request: EmotionLogRequestType) => postEmotionLog(request),
    ...options,
    onSuccess: (data, variables, context) => {
      if (userData?.id) {
        queryClient.invalidateQueries(quries.emotionLogs.monthly(params));
      }
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });
};

// NOTE: 사용 방법
// const mutation = usePostEmotionLog({
//   onSuccess: (data, variables, context) => {
//     // 감정 등록 후 실행할 코드
//   },
// });
// mutation.mutate({ emotion: 'happy' });

// 오늘의 감정 조회
export const useGetTodayEmotionLog = (params: EmotionLogQueryParamsType) => {
  const { queryKey, queryFn } = quries.emotionLogs.today(params);

  return useQuery({
    queryKey,
    queryFn,
    enabled: !!params.userId,
  });
};

// NOTE: 사용 방법
// const { data, error, isLoading } = useGetTodayEmotionLog();

// 월간 감정 조회
export const useGetMonthlyEmotionLogs = (params: EmotionLogQueryParamsType) => {
  return useSuspenseQuery(quries.emotionLogs.monthly(params));
};

// NOTE: 사용 방법
// const params = { userId: 110, year: 2024, month: 8 } as const;
// const { data, error, isLoading } = useGetMonthlyEmotionLogs(params);
