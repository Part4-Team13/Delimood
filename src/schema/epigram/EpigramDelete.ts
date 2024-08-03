import * as z from 'zod';

// 에피그램 삭제 DELETE 요청 200 응답
export const deleteEpigramResponse = z.object({
  id: z.number(),
});

// 에피그램 좋아요 취소 DELETE 요청
// 태그 타입 정의
const tagType = z.object({
  name: z.string().min(1).max(10),
  id: z.number().int().positive(),
});

// 에피그램 좋아요 취소
export const epigramDetailType = z.object({
  likeCount: z.number(),
  tags: z.array(tagType),
  writerId: z.number().int().min(1),
  referenceUrl: z.string().url().nullable(),
  referenceTitle: z.string().max(100).nullable(),
  author: z.string().min(1).max(30),
  content: z.string().min(1).max(500),
  id: z.number().int().min(1),
  isLiked: z.boolean(),
});

// 403 및 404 에러 응답 스키마 정의
export const errorResponse = z.object({
  message: z.string(),
});

export type DeleteEpigramResponseType = z.infer<typeof deleteEpigramResponse>;
export type ErrorResponseSchemaType = z.infer<typeof errorResponse>;
export type DeleteEpigramDetailType = z.infer<typeof epigramDetailType>;
