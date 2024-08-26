import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import quries from '../apis/queries';
import { GetUserReponseType, GetUserRequestType, PatchMeRequestType, GetUserCommentRequestType } from '../schema/userSchema';
import { MutationOptions } from '../types/query';
import { updateMe, updateImage } from '../apis/user';

export const useGetMeQuery = () => useSuspenseQuery(quries.user.getMe());

export const useMeQuery = () => useQuery(quries.user.getMe());

export const useUserQuery = (requset: GetUserRequestType) => useQuery(quries.user.getUser(requset));

export const useUpdateMe = (options: MutationOptions<PatchMeRequestType>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: PatchMeRequestType) => updateMe(request),
    ...options,
    onSuccess: (...arg) => {
      queryClient.invalidateQueries(quries.user.getMe());
      if (options?.onSuccess) {
        options?.onSuccess(...arg);
      }
    },
  });
};

export const useUserCommentQuery = (requset: GetUserCommentRequestType) => useQuery(quries.user.getUserComment(requset));

export const useUpdateImage = (options: MutationOptions<{ file: File; data: Omit<PatchMeRequestType, 'image'> }, GetUserReponseType>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ file, data }: { file: File; data: Omit<PatchMeRequestType, 'image'> }) => updateImage(file, data),
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(quries.user.getMe());
      if (options?.onSuccess) {
        options?.onSuccess(...args);
      }
    },
  });
};
