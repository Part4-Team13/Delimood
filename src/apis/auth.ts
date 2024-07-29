import { LoginResponseType } from '../schema/authSchema';
import httpClient from '.';

export const login = async (email: string, password: string): Promise<LoginResponseType> => {
  const response = await httpClient.post('/auth/signIn', { email, password });
  return response.data;
};
