import * as z from 'zod';

export const epigramRequest = z.object({
  tags: z.array(z.string().min(1).max(10)).min(1).max(3),
  referenceUrl: z
    .string()
    .url()
    .regex(/^https?:\/\//),
  referenceTitle: z.string().max(100),
  author: z.string().min(1).max(30),
  content: z.string().min(1).max(500),
});

// response 200 응답
export const epigramResponse = z.object({
  likeCount: z.number(),
  tags: z.array(
    z.object({
      name: z.string().min(1),
      id: z.number().int().min(1),
    }),
  ),
  writerId: z.number().int().min(1),
  referenceUrl: z.string().url().nullable(),
  referenceTitle: z.string().max(100).nullable(),
  author: z.string().min(1).max(30),
  content: z.string().min(1).max(500),
  id: z.number().int().min(1),
  isLiked: z.boolean(),
});

// 404에러
export const postError = z.object({
  message: z.string(),
});

export type EpigramRequestType = z.infer<typeof epigramRequest>;
export type EpigramResponseType = z.infer<typeof epigramResponse>;
export type PostErrorType = z.infer<typeof postError>;
