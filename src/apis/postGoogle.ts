import { PUBLIC_GOOGLE_CLIENT_ID, PUBLIC_GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } from '../constants/env';
import axios from 'axios';
import httpClient from '.';

//code를 사용하여 구글의 /token 엔드포인트로 POST 요청을 보내 id_token을 받아오는 함수
const getGoogleIdToken = async (code: string) => {
  const response = await axios.post(
    'https://oauth2.googleapis.com/token',
    new URLSearchParams({
      code,
      client_id: PUBLIC_GOOGLE_CLIENT_ID,
      client_secret: PUBLIC_GOOGLE_CLIENT_SECRET,
      redirect_uri: GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
    }),
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    },
  );

  return response.data;
};

//위의 함수에서 id_token을 획득한 후, 이를 서버로 전달하여 로그인 처리를 진행함.
const postGoogle = async (code: string) => {
  const tokenResponse = await getGoogleIdToken(code);
  const idToken = tokenResponse.id_token;

  // 서버에 idToken을 보내는 요청
  const response = await httpClient.post('/auth/signIn/GOOGLE', {
    redirectUri: GOOGLE_REDIRECT_URI,
    token: idToken,
  });

  return response.data;
};

export default postGoogle;
