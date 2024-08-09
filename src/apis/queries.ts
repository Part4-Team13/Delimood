import { createQueryKeyStore } from '@lukemorales/query-key-factory';
import { getMe, getUser, getUserComment } from './user';
import { getTodayEmotionLog, getMonthlyEmotionLogs } from './emotionLog';
import { getComments } from './comment';
import { GetUserRequestType, GetUserCommentRequestType } from '../schema/userSchema';
import { GetCommentsRequestType } from '../schema/commentSchema';

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
    getUserComment: (request: GetUserCommentRequestType) => ({
      queryKey: [request],
      queryFn: () => getUserComment(request),
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

  comments: {
    getComments: (request: GetCommentsRequestType) => ({
      queryKey: ['getComments', request],
      queryFn: () => getComments(request),
    }),
  },
});

export default quries;
