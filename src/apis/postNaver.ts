import { NAVER_REDIRECT_URI } from '../constants/env';
import httpClient from '.';

const postNaver = async (code: string, state: string) => {
  const response = await httpClient.post('/auth/signIn/NAVER', {
    redirectUri: NAVER_REDIRECT_URI,
    token: code,
    state: state,
  });

  return response.data;
};

export default postNaver;
