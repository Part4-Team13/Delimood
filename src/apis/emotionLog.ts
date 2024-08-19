import { EmotionLogRequestType, EmotionLogResponseType, EmotionLogsResponseType } from '../schema/emotionLogSchema';
import httpClient from '.';

export const postEmotionLog = async (request: EmotionLogRequestType): Promise<EmotionLogResponseType> => {
  const response = await httpClient.post('/emotionLogs/today', request);
  return response.data;
};

export const getTodayEmotionLog = async (): Promise<EmotionLogResponseType> => {
  const response = await httpClient.get('/emotionLogs/today');
  return response.data;
};

export const getMonthlyEmotionLogs = async (): Promise<EmotionLogsResponseType> => {
  const response = await httpClient.get('/emotionLogs/monthly');
  return response.data;
};
