import { useMutation } from '@tanstack/react-query';
import { LoginResponseType } from '../schema/authSchema';
import { login } from '../apis/auth';
import { MutationOptions } from '../types/query';

export const useLogin = (options: MutationOptions<{ email: string; password: string }, LoginResponseType>) => {
  return useMutation({
    mutationFn: ({ email, password }) => login(email, password),
    ...options,
  });
};
