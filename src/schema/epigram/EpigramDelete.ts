import * as z from 'zod';

// 에피그램 삭제 DELETE 요청
export const deleteEpigramRequest = z.object({
  id: z.number().int().min(1),
});

// 에피그램 좋아요 취소 DELETE 요청
// 에피그램 상세 정보
export const deleteEpigramDetail = z.object({
  likeCount: z.number(),
  tags: z.array(
    z.object({
      name: z.string().min(1).max(10),
      id: z.number().int().min(1),
    }),
  ),
  writerId: z.number().int().min(1),
  referenceUrl: z
    .string()
    .url()
    .regex(/^https?:\/\//)
    .nullable(),
  referenceTitle: z.string().max(100).nullable(),
  author: z.string().min(1).max(30),
  content: z.string().min(1).max(500),
  id: z.number().int().min(1),
  isLiked: z.boolean(),
});

// 403 및 404 에러 응답 스키마 정의
export const errorResponseSchema = z.object({
  message: z.string(),
});

export type DeleteEpigramRequestType = z.infer<typeof deleteEpigramRequest>;
export type ErrorResponseSchemaType = z.infer<typeof errorResponseSchema>;
export type DeleteEpigramDetailType = z.infer<typeof deleteEpigramDetail>;
