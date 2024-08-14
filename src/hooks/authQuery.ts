import { useMutation } from '@tanstack/react-query';
import { LoginRequestType, LoginResponseType, SignUpRequestType, SignUpResponseType } from '../schema/authSchema';
import { signIn, signUp } from '../apis/auth';
import { MutationOptions } from '../types/query';
import Cookies from 'js-cookie';

export const useSignUp = (options: MutationOptions<SignUpRequestType, SignUpResponseType>) => {
  return useMutation({
    mutationFn: (data: SignUpRequestType) => signUp(data),
    ...options,
  });
};

//Refactor : 쿠키에서 스토리지로 변경하기 작업하기
export const useLogin = (options: MutationOptions<LoginRequestType, LoginResponseType>) => {
  return useMutation({
    mutationFn: (data: LoginRequestType) => signIn(data),
    ...options,
    onSuccess: (data, ...args) => {
      Cookies.set('accessToken', data.accessToken, { expires: new Date(Date.now() + 1800 * 1000) });
      Cookies.set('refreshToken', data.refreshToken);

      if (options?.onSuccess) {
        options.onSuccess(data, ...args);
      }
    },
  });
};
