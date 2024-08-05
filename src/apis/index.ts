import axios from 'axios';
import qs from 'qs';
import Cookies from 'js-cookie';
import { REACT_APP_API_URL } from '../constants/env';

const httpClient = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: { 'Content-Type': 'application/json' },
  paramsSerializer: (parameters) => qs.stringify(parameters, { arrayFormat: 'repeat', encode: false }),
});

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

export default httpClient;
