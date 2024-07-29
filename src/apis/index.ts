import axios from 'axios';
import qs from 'qs';
import { REACT_APP_API_URL } from '../constants/env';

const httpClient = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: { 'Content-Type': 'application/json' },
  paramsSerializer: (parameters) => qs.stringify(parameters, { arrayFormat: 'repeat', encode: false }),
});

export default httpClient;
