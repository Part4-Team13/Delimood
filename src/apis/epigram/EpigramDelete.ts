import httpClient from '../index';
import { deleteEpigramResponse, epigramDetailType, DeleteEpigramResponseType, DeleteEpigramDetailType } from '../../schema/epigram/EpigramDelete';
import { handleError } from '../common';

// 에피그램 삭제 DELETE 요청
export const deleteEpigram = async (epigramId: number): Promise<DeleteEpigramResponseType> => {
  try {
    const response = await httpClient.delete(`/epigrams/${epigramId}`);
    return deleteEpigramResponse.parse(response.data);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// 좋아요 취소 DELETE 요청
export const cancelLikeEpigram = async (epigramId: number): Promise<DeleteEpigramDetailType> => {
  try {
    const response = await httpClient.delete(`/epigrams/${epigramId}/like`);
    return epigramDetailType.parse(response.data);
  } catch (error) {
    handleError(error);
    throw error;
  }
};
