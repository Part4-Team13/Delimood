import axios from 'axios';
import qs from 'qs';
import { REACT_APP_API_URL } from '../constants/env';
import alertMessage from '../components/AlertMessage';

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
    const statusCode = error.response?.status;

    // NOTE : 인증 오류 401, 403 에러가 발생한 경우
    if (statusCode === 401 || statusCode === 403) {
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken || statusCode === 403) throw new Error('Authorization error or token problem!');

        // NOTE : refreshToken 토큰을 사용하여 새로운 accessToken 토큰 요청
        const response = await axios.post(`${REACT_APP_API_URL}/auth/refresh-token`, { refreshToken });
        const { accessToken: newAccessToken } = response.data;
        localStorage.setItem('accessToken', newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return httpClient(originalRequest);
      } catch (refreshError) {
        //Refactor : refreshToken이 만료되었거나 다른 오류 발생 시 로그아웃 처리, 알림 메시지 후 로그인 창으로 이동
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        alertMessage({ title: '로그인 기록이 만료되었습니다.', message: '다시 로그인 부탁드립니다.', color: 'red' });
      }
    }

    return Promise.reject(error);
  },
);

export default httpClient;
