import { GetEpigramListResponseType, PaginationRequest } from '../schema/epigramSchema';

import httpClient from '.';

// 에피그램 목록 조회
export const getEpigramList = async (params: PaginationRequest): Promise<GetEpigramListResponseType> => {
  const response = await httpClient.get('/epigrams', { params });
  return response.data;
};
