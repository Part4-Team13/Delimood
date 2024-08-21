import { PUBLIC_GOOGLE_CLIENT_ID, PUBLIC_GOOGLE_CLIENT_SECRET, TEST_GOOGLE_REDIRECT_URI } from '../constants/env';
import axios from 'axios';
import httpClient from '.';

const getGoogleIdToken = async (code: string) => {
  const response = await axios.post(
    'https://oauth2.googleapis.com/token',
    new URLSearchParams({
      code,
      client_id: PUBLIC_GOOGLE_CLIENT_ID,
      client_secret: PUBLIC_GOOGLE_CLIENT_SECRET,
      redirect_uri: TEST_GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
    }),
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    },
  );

  return response.data;
};

const postGoogle = async (code: string) => {
  const tokenResponse = await getGoogleIdToken(code);
  const idToken = tokenResponse.id_token;

  // 서버에 idToken을 보내는 요청
  const response = await httpClient.post('/auth/signIn/GOOGLE', {
    redirectUri: TEST_GOOGLE_REDIRECT_URI,
    token: idToken,
  });

  return response.data;
};

export default postGoogle;
