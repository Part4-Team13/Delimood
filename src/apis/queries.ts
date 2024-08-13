import { createQueryKeyStore } from '@lukemorales/query-key-factory';
import { getMe, getUser, getUserComment } from './user';
import { getTodayEmotionLog, getMonthlyEmotionLogs } from './emotionLog';
import { getComments } from './comment';
import { GetUserCommentRequestType, GetUserRequestType } from '../schema/userSchema';
import { GetCommentsRequestType } from '../schema/commentSchema';
import { PaginationRequest } from '../schema/epigramSchema';
import { getEpigramList, getTodayEpigram, getEpigramDetail, getCommentList } from '../apis/epigram';

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

  epigrams: {
    list: (params: PaginationRequest) => ({
      queryKey: ['epigrams', 'list', params],
      queryFn: () => getEpigramList(params),
    }),
    todayEpigram: () => ({
      queryKey: ['epigrams', 'today'],
      queryFn: getTodayEpigram,
    }),
    detailEpigram: (id: number) => ({
      queryKey: ['epigrams', 'detail', id],
      queryFn: () => getEpigramDetail(id),
    }),
    comments: (id: number, { limit, cursor }: PaginationRequest) => ({
      queryKey: ['epigrams', 'comments', id, { limit, cursor }],
      queryFn: () => getCommentList(id, { limit, cursor }),
    }),
  },
});

export default quries;
