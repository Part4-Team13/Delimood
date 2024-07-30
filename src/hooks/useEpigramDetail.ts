import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { EpigramDetailType } from '../schema/epigram/EpigramGet';
import { getEpigramDetail } from '../apis/epigram/EpigramGet';

export const useEpigramDetailQuery = (teamId: number, id: number) => {
  return useQuery<EpigramDetailType, AxiosError>({
    queryKey: ['epigramDetail', teamId, id],
    queryFn: () => getEpigramDetail(teamId, id),
  });
};
