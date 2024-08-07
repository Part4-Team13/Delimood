import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { GetEpigramListResponseType, PaginationRequest } from '../schema/epigramSchema';
import { getEpigramList } from '../apis/epigram';
import quries from '../apis/queries';

// 에피그램 목록 조회
export const useGetEpigramListQuery = (params: PaginationRequest, options?: UseQueryOptions<GetEpigramListResponseType>) => {
  return useQuery<GetEpigramListResponseType>({
    queryKey: quries.epigrams.list(params).queryKey,
    queryFn: () => getEpigramList(params),
    ...options,
  });
};
