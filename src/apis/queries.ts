import { createQueryKeyStore } from '@lukemorales/query-key-factory';
import { getMe, getUser } from './user';
import { getTodayEmotionLog, getMonthlyEmotionLogs } from './emotionLog';
import { getComments } from './comment';
import { GetUserRequestType } from '../schema/userSchema';
import { GetCommentsRequestType } from '../schema/commentSchema';
import { PaginationRequest } from '../schema/epigramSchema';
import { getEpigramList } from '../apis/epigram';

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

  comments: {
    getComments: (request: GetCommentsRequestType) => ({
      queryKey: ['getComments', request],
      queryFn: () => getComments(request),
    }),
  },

  epigrams: {
    list: (params: PaginationRequest) => ({
      queryKey: ['epigrams', 'list', params],
      queryFn: () => getEpigramList(params),
    }),
  },
});

export default quries;
