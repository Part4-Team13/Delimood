import { NAVER_REDIRECT_URI } from '../constants/env';
import httpClient from '.';

//클라이언트에서 받은 네이버 인증 code와 state를 서버에 POST 요청으로 보내서 인증을 완료.
const postNaver = async (code: string, state: string) => {
  const response = await httpClient.post('/auth/signIn/NAVER', {
    redirectUri: NAVER_REDIRECT_URI,
    token: code,
    state: state,
  });

  return response.data;
};

export default postNaver;
