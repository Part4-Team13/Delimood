import { EmotionLogRequestType, EmotionLogResponseType, EmotionLogsResponseType } from '../schema/emotionLogSchema';
import httpClient from '.';
import { EmotionLogQueryParamsType } from '../schema/emotionLogSchema';

export const postEmotionLog = async (request: EmotionLogRequestType): Promise<EmotionLogResponseType> => {
  const response = await httpClient.post('/emotionLogs/today', request);
  return response.data;
};

export const getTodayEmotionLog = async (params: EmotionLogQueryParamsType): Promise<EmotionLogResponseType> => {
  const response = await httpClient.get('/emotionLogs/today', { params });
  return response.data;
};

export const getMonthlyEmotionLogs = async (params: EmotionLogQueryParamsType): Promise<EmotionLogsResponseType> => {
  const response = await httpClient.get('/emotionLogs/monthly', { params });
  return response.data;
};
