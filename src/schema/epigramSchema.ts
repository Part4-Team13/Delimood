import * as z from 'zod';

/* Post 에피그램 작성 */

// 공통 정의 (tag, id, author, content)
export const TagName = z.string().min(1).max(10);
export const Id = z.number().int().min(1);
export const Author = z.string().min(1).max(30);
export const Content = z.string().min(1).max(500);

/* Get 에피그램 작성 */

// 에피그램 목록 조회

// Epigram List 정의
export const GetEpigramList = z.object({
  likeCount: z.number(),
  tags: z
    .array(
      z.object({
        name: TagName,
        id: Id,
      }),
    )
    .min(1),
  writerId: Id,
  referenceUrl: z.string().url().nullable(),
  referenceTitle: z.string().max(100).nullable(),
  author: Author,
  content: Content,
  id: Id,
});

export const GetEpigramListResponse = z.object({
  totalCount: z.number(),
  nextCursor: z.number().nullable(),
  list: z.array(GetEpigramList),
});

export type GetEpigramListType = z.infer<typeof GetEpigramList>;
export type GetEpigramListResponseType = z.infer<typeof GetEpigramListResponse>;

export type PaginationRequest = {
  limit: number;
  cursor?: number;
  keyword?: string;
  writerId?: number;
};
