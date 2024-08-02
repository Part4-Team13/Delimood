import * as z from 'zod';

//에피그램 작성 Post 요청
export const createEpigram = z.object({
  tags: z.array(z.string().min(1).max(10)).max(3),
  referenceUrl: z.string().url().optional(),
  referenceTitle: z.string().max(100).optional(),
  author: z.string().min(1).max(30),
  content: z.string().min(1).max(500),
});

// response 200 응답
export const epigramList = z.object({
  likeCount: z.number().optional(),
  tags: z.array(
    z.object({
      name: z.string(),
      id: z.number().int(),
    }),
  ),
  writerId: z.number().int().min(1),
  referenceUrl: z.string().url().optional().nullable(),
  referenceTitle: z.string().max(100).optional().nullable(),
  author: z.string().min(1).max(30),
  content: z.string().min(1).max(500),
  id: z.number().int().min(1),
});

// 에피그램 좋아요 Post response 200
export const epigramDetail = z.object({
  likeCount: z.number(),
  tags: z.array(
    z.object({
      name: z.string(),
      id: z.number().int(),
    }),
  ),
  writerId: z.number().int().min(1),
  referenceUrl: z.string().url().optional().nullable(),
  referenceTitle: z.string().max(100).optional().nullable(),
  author: z.string().min(1).max(30),
  content: z.string().min(1).max(500),
  id: z.number().int().min(1),
  isLiked: z.boolean(),
});

// 403 및 404 에러 응답 스키마 정의
export const errorResponse = z.object({
  message: z.string(),
});

export type createEpigramType = z.infer<typeof createEpigram>;
export type epigramListType = z.infer<typeof epigramList>;
export type ErrorType = z.infer<typeof errorResponse>;
