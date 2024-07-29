import * as z from 'zod';

// 에피그램 수정 Patch 요청
// UpdateEpigramBody 정의
export const updateEpigramBody = z.object({
  tags: z.array(z.string().min(1).max(10)).max(3),
  referenceUrl: z
    .string()
    .url()
    .regex(/^https?:\/\//),
  referenceTitle: z.string().max(100).nullable(),
  author: z.string().min(1).max(30),
  content: z.string().min(1).max(500),
});

// 403 및 404 Error
export const errorResponseSchema = z.object({
  message: z.string(),
});

export type ErrorResponseType = z.infer<typeof errorResponseSchema>;
export type UpdateEpigramBodyType = z.infer<typeof updateEpigramBody>;
