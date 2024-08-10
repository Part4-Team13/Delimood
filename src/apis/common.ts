import axios, { AxiosError } from 'axios';
import { errorResponse } from '../schema/epigram/EpigramPost';

// 에러 핸들링 함수
export const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    const response = axiosError.response;

    if (response) {
      const parsedError = errorResponse.safeParse(response.data);
      if (parsedError.success) {
        console.error(`오류 ${response.status}: ${parsedError.data.message}`);
      } else {
        console.error('알 수 없는 오류가 발생했습니다:', response.data);
      }
    } else {
      console.error('응답을 받을 수 없습니다:', axiosError.message);
    }
  } else {
    console.error('예상치 못한 오류가 발생했습니다:', error);
  }
};
