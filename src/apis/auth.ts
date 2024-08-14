import { SignUpRequestType, SignUpResponseType, LoginRequestType, LoginResponseType } from '../schema/authSchema';
import httpClient from '.';

export const signUp = async (data: SignUpRequestType): Promise<SignUpResponseType> => {
  const response = await httpClient.post('/auth/signUp', data);
  return response.data;
};

export const signIn = async (data: LoginRequestType): Promise<LoginResponseType> => {
  const response = await httpClient.post('/auth/signIn', data);
  return response.data;
};
