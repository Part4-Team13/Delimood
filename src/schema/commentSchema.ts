import * as z from 'zod';

// 댓글 등록
export const PostCommentSchema = z.object({
  epigramId: z.number(),
  isPrivate: z.boolean(),
  content: z.string(),
});

// 댓글 목록 조회
// 1. 댓글 작성자
export const WriterSchema = z.object({
  image: z.string().url(),
  nickname: z.string(),
  id: z.number(),
});

// 2. 댓글 목록
export const ListItemSchema = z.object({
  epigramId: z.number(),
  writer: WriterSchema,
  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
  isPrivate: z.boolean(),
  content: z.string(),
  id: z.number(),
});

// 3. 전체 응답
export const ResponseSchema = z.object({
  totalCount: z.number(),
  nextCursor: z.number(),
  list: z.array(ListItemSchema),
});

// 댓글 수정
export const PatchCommentSchema = z.object({
  isPrivate: z.boolean(),
  content: z.string(),
});

// 댓글 삭제
export const DeleteCommentSchema = z.object({
  id: z.number(),
});

// 댓글 목록 조회 요청
export const GetCommentsRequestSchema = z.object({
  limit: z.number(),
  cursor: z.number().optional(),
});

export type PostCommentType = z.infer<typeof PostCommentSchema>;
export type ResponseType = z.infer<typeof ResponseSchema>;
export type ListItemType = z.infer<typeof ListItemSchema>;
export type PatchCommentType = z.infer<typeof PatchCommentSchema>;
export type DeleteCommentType = z.infer<typeof DeleteCommentSchema>;
export type GetCommentsRequestType = z.infer<typeof GetCommentsRequestSchema>;
