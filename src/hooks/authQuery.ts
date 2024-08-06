import { useMutation } from '@tanstack/react-query';
import { LoginRequestType, LoginResponseType, SignUpRequestType, SignUpResponseType } from '../schema/authSchema';
import { signIn, signUp } from '../apis/auth';
import { MutationOptions } from '../types/query';

export const useSignUp = (options: MutationOptions<SignUpRequestType, SignUpResponseType>) => {
  return useMutation({
    mutationFn: (data: SignUpRequestType) => signUp(data),
    ...options,
  });
};

export const useLogin = (options: MutationOptions<LoginRequestType, LoginResponseType>) => {
  return useMutation({
    mutationFn: (data: LoginRequestType) => signIn(data),
    ...options,
  });
};
