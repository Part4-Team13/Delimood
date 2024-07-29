import { useMutation } from '@tanstack/react-query';
import { LoginResponseType, SignUpRequestType, SignUpResponseType } from '../schema/authSchema';
import { login, signUp } from '../apis/auth';
import { MutationOptions } from '../types/query';

export const useSignUp = (options: MutationOptions<SignUpRequestType, SignUpResponseType>) => {
  return useMutation({
    mutationFn: (data: SignUpRequestType) => signUp(data),
    ...options,
  });
};

export const useLogin = (options: MutationOptions<{ email: string; password: string }, LoginResponseType>) => {
  return useMutation({
    mutationFn: ({ email, password }) => login(email, password),
    ...options,
  });
};
