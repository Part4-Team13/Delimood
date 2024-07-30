import * as z from 'zod';
import { fetchFromApi } from '../common';
import { deleteEpigramRequest, deleteEpigramDetail } from '../../schema/epigram/EpigramDelete';

// 에피그램 삭제 요청 함수
export const deleteEpigram = async (teamId: number, id: number): Promise<void> => {
  const url = `${teamId}/epigrams/${id}`;
  await fetchFromApi(url, z.void(), 'delete', deleteEpigramRequest.parse({ teamId, id }));
};

// 에피그램 좋아요 취소 함수
export const cancelEpigramLike = async (teamId: number, id: number): Promise<void> => {
  const url = `${teamId}/epigrams/${id}/like`;
  await fetchFromApi(url, z.void(), 'delete', deleteEpigramDetail.parse({ teamId, id }));
};
