import httpClient from '../index';
import { handleError } from '../common';
import { updateEpigramBody, UpdateEpigramBodyType } from '../../schema/epigram/EpigramPatch';

// 에피그램 수정 PATCH 요청
export const updateEpigram = async (id: number, data: UpdateEpigramBodyType): Promise<void> => {
  try {
    const validatedData = updateEpigramBody.parse(data);
    const url = `/epigrams/${id}`;
    await httpClient.patch(url, validatedData);
  } catch (error) {
    handleError(error);
    throw error;
  }
};
