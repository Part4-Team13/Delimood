import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import quries from '../apis/queries';
import { GetUserReponseType, GetUserRequestType, PatchMeRequestType, GetUserCommentRequestType } from '../schema/userSchema';
import { MutationOptions } from '../types/query';
import { updateMe, updateImage } from '../apis/user';

export const useGetMeQuery = () => useQuery(quries.user.getMe());

export const useMeQuery = () => useQuery(quries.user.getMe());

export const useUserQuery = (requset: GetUserRequestType) => useQuery(quries.user.getUser(requset));

export const useUpdateMe = (options: MutationOptions<GetUserReponseType>) => {
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

//TODO: 마이페이지에서 프로필 파일 업로드에 관한 코드로 잘 작동되는지는 로그인 이후 확인할 예정
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
