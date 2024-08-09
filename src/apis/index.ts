import axios from 'axios';
import qs from 'qs';
import Cookies from 'js-cookie';
import { REACT_APP_API_URL } from '../constants/env';

const httpClient = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: { 'Content-Type': 'application/json' },
  paramsSerializer: (parameters) => qs.stringify(parameters, { arrayFormat: 'repeat', encode: false }),
});

//Refactor : 쿠키에서 스토리지로 변경하기 작업하기
httpClient.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // NOTE : 인증 오류 401 에러가 발생한 경우
    if (error.response?.status === 401) {
      try {
        const refreshToken = Cookies.get('refreshToken');
        if (!refreshToken) throw new Error('refreshToken 문제발생!');

        // NOTE : refreshToken 토큰을 사용하여 새로운 accessToken 토큰 요청
        const response = await axios.post(`${REACT_APP_API_URL}/auth/refresh-token`, { refreshToken });
        const { accessToken: newAccessToken } = response.data;
        Cookies.set('accessToken', newAccessToken, { expires: new Date(Date.now() + 30 * 60 * 1000) });

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return httpClient(originalRequest);
      } catch (refreshError) {
        //Refactor : refreshToken이 만료되었거나 다른 오류 발생 시 로그아웃 처리, 알림메시지 후 로그인창으로 이동
        console.error('Refresh token failed:', refreshError);
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
      }
    }

    return Promise.reject(error);
  },
);

export default httpClient;
