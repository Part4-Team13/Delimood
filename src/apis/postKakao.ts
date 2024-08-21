import httpClient from '.';
import { TEST_REDIRECT_URI } from '../constants/env';

const postKakao = async (code: string) => {
  const response = await httpClient.post('/auth/signIn/KAKAO', {
    redirectUri: TEST_REDIRECT_URI,
    token: code,
  });
  return response.data;
};

export default postKakao;
