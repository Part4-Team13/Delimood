import { createQueryKeyStore } from '@lukemorales/query-key-factory';
import { getMe, getUser } from './user';
import { getTodayEmotionLog, getMonthlyEmotionLogs } from './emotionLog';
import { GetUserRequestType } from '../schema/userSchema';

const quries = createQueryKeyStore({
  user: {
    getMe: () => ({
      queryKey: ['getMe'],
      queryFn: () => getMe(),
    }),
    getUser: (request: GetUserRequestType) => ({
      queryKey: [request],
      queryFn: () => getUser(request),
    }),
  },

  emotionLogs: {
    today: () => ({
      queryKey: ['emotionLogs', 'today'],
      queryFn: getTodayEmotionLog,
    }),
    monthly: () => ({
      queryKey: ['emotionLogs', 'monthly'],
      queryFn: getMonthlyEmotionLogs,
    }),
  },
});

export default quries;
