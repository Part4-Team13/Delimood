import axios from 'axios';
import qs from 'qs';
import { REACT_APP_API_URL } from '../constants/env';

const httpClient = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: { 'Content-Type': 'application/json' },
  paramsSerializer: (parameters) => qs.stringify(parameters, { arrayFormat: 'repeat', encode: false }),
});

httpClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
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
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('refreshToken 문제발생!');

        // NOTE : refreshToken 토큰을 사용하여 새로운 accessToken 토큰 요청
        const response = await axios.post(`${REACT_APP_API_URL}/auth/refresh-token`, { refreshToken });
        const { accessToken: newAccessToken } = response.data;
        localStorage.setItem('accessToken', newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return httpClient(originalRequest);
      } catch (refreshError) {
        //Refactor : refreshToken이 만료되었거나 다른 오류 발생 시 로그아웃 처리, 알림 메시지 후 로그인 창으로 이동
        console.error('Refresh token failed:', refreshError);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    }

    return Promise.reject(error);
  },
);

export default httpClient;
