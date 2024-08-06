import httpClient from '../index';
import { handleError } from '../common';
import { createEpigram, CreateEpigramType, epigramList, EpigramListType, epigramDetail, EpigramDetailType } from '../../schema/epigram/EpigramPost';

// 에피그램 작성 POST 요청
export const createEpigramRequest = async (data: CreateEpigramType): Promise<EpigramListType> => {
  try {
    const validatedData = createEpigram.parse(data);
    const response = await httpClient.post('/epigrams', validatedData);
    return epigramList.parse(response.data);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// 에피그램 좋아요 POST 요청
export const likeEpigram = async (epigramId: number, data: EpigramDetailType): Promise<EpigramDetailType> => {
  try {
    const validatedData = epigramDetail.parse(data);
    const response = await httpClient.post(`/epigrams/${epigramId}/like`, validatedData);
    return epigramDetail.parse(response.data);
  } catch (error) {
    handleError(error);
    throw error;
  }
};
