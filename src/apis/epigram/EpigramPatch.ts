import * as z from 'zod';
import { updateEpigramBody } from '../../schema/epigram/EpigramPatch';
import { fetchFromApi } from '../common';

export const updateEpigram = async (teamId: number, id: number, data: z.infer<typeof updateEpigramBody>): Promise<void> => {
  const validatedData = updateEpigramBody.parse(data);
  await fetchFromApi(`/teams/${teamId}/epigrams/${id}`, z.void(), 'patch', validatedData);
};
