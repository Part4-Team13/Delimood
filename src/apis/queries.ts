import { createQueryKeyStore } from '@lukemorales/query-key-factory';
import { getMe, getUser } from './user';
import { getComments } from './comment';
import { GetUserRequestType } from '../schema/userSchema';
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
  },

  comments: {
    getComments: (request: GetCommentsRequestType) => ({
      queryKey: ['getComments', request],
      queryFn: () => getComments(request),
    }),
  },
});

export default quries;
