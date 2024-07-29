import { SignUpRequestType, SignUpResponseType, LoginResponseType } from '../schema/authSchema';
import httpClient from '.';

export const signUp = async (data: SignUpRequestType): Promise<SignUpResponseType> => {
  const response = await httpClient.post('/auth/signUp', data);
  return response.data;
};

export const login = async (email: string, password: string): Promise<LoginResponseType> => {
  const response = await httpClient.post('/auth/signIn', { email, password });
  return response.data;
};
