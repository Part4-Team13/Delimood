import * as z from 'zod';

// 에피그램 수정 Patch 요청
// UpdateEpigramBody 정의
export const updateEpigramBody = z.object({
  tags: z.array(z.string().min(1).max(10)).max(3),
  referenceUrl: z.string().url(),
  referenceTitle: z.string().max(100).optional(),
  author: z.string().min(1).max(30),
  content: z.string().min(1).max(500),
});

// 200 응답 스키마 정의
export const epigramListType = z.object({
  likeCount: z.number(),
  tags: z.array(
    z.object({
      name: z.string().min(1).max(10),
      id: z.number().int().min(1),
    }),
  ),
  writerId: z.number().int().min(1),
  referenceUrl: z.string().url().nullable(),
  referenceTitle: z.string().max(100).nullable(),
  author: z.string().min(1).max(30),
  content: z.string().min(1).max(500),
  id: z.number().int().min(1),
});

// 403 및 404 Error
export const errorResponse = z.object({
  message: z.string(),
});

export type ErrorResponseType = z.infer<typeof errorResponse>;
export type UpdateEpigramBodyType = z.infer<typeof updateEpigramBody>;
export type EpigramListType = z.infer<typeof epigramListType>;
