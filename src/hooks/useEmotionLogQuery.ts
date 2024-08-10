import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import quries from '../apis/queries';
import { PostEmotionLog, GetTodayEmotionLog } from '../schema/emotionLogSchema';
import { postEmotionLog } from '../apis/emotionLog';
import { MutationOptions } from '../types/query';

// 오늘의 감정 등록
export const usePostEmotionLog = (options: MutationOptions<GetTodayEmotionLog>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: PostEmotionLog) => postEmotionLog(request),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(quries.emotionLogs.today());
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
export const useGetTodayEmotionLog = () => {
  return useQuery(quries.emotionLogs.today());
};
// NOTE: 사용 방법
// const { data, error, isLoading } = useGetTodayEmotionLog();

// 월간 감정 조회
export const useGetMonthlyEmotionLogs = () => {
  return useQuery(quries.emotionLogs.monthly());
};
// NOTE: 사용 방법
// const { data, error, isLoading } = useGetTodayEmotionLog();
