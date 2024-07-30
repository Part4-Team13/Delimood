import * as z from 'zod';
import { updateEpigramBody } from '../../schema/epigram/EpigramPatch';
import { fetchFromApi } from '../common';

// 에피그램 수정 PATCH 요청
export const updateEpigram = async (id: number, data: z.infer<typeof updateEpigramBody>): Promise<void> => {
  const validatedData = updateEpigramBody.parse(data);
  const url = `/epigrams/${id}`;
  await fetchFromApi(url, z.void(), 'patch', validatedData);
};
