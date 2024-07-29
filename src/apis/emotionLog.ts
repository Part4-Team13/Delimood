import { PostEmotionLog, GetTodayEmotionLog, GetMonthlyEmotionLogs } from '../schema/emotionLogSchema';
import httpClient from '.';

export const postEmotionLog = async (request: PostEmotionLog): Promise<GetTodayEmotionLog> => {
  const response = await httpClient.post('/emotionLogs/today', request);
  return response.data;
};

export const getTodayEmotionLog = async (): Promise<GetTodayEmotionLog> => {
  const response = await httpClient.get('/emotionLogs/today');
  return response.data;
};

export const getMonthlyEmotionLogs = async (): Promise<GetMonthlyEmotionLogs[]> => {
  const response = await httpClient.get('/emotionLogs/monthly');
  return response.data;
};
