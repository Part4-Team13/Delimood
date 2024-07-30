import * as z from 'zod';

// 태그 타입 정의
const tagType = z.object({
  name: z.string().min(1).max(10),
  id: z.number().int().positive(),
});

// 에피그램 상세 조회, 오늘의 에피그램 GET 요청
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

// 에피그램 댓글 목록 조회 GET 요청
// WriterType 정의
const writerType = z.object({
  image: z.string(),
  nickname: z.string(),
  id: z.number().int().min(0),
});

// CommentType 정의
const commentType = z.object({
  epigramId: z.number().min(0),
  writer: writerType,
  updatedAt: z.string().datetime(),
  createdAt: z.string().datetime(),
  isPrivate: z.boolean(),
  content: z.string().min(1),
  id: z.number().min(0),
});

// CursorBasedPaginationResponse_CommentType_ 정의
export const cursorBasedPaginationResponse_CommentType_ = z.object({
  totalCount: z.number().nonnegative(),
  nextCursor: z.number().nullable(),
  list: z.array(commentType),
});

// 에피그램 목록 조회 GET 요청
// EpigramListType 정의
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

// CursorBasedPaginationResponse_EpigramListType_ 정의
export const cursorBasedPaginationResponse_EpigramListType_ = z.object({
  totalCount: z.number().positive(),
  nextCursor: z.number().nullable(),
  list: z.array(epigramListType),
});

export type EpigramDetailType = z.infer<typeof epigramDetailType>;
export type CursorBasedPaginationResponse_CommentType_ = z.infer<typeof cursorBasedPaginationResponse_CommentType_>;
export type CursorBasedPaginationResponse_EpigramListType_ = z.infer<typeof cursorBasedPaginationResponse_EpigramListType_>;
export type EpigramListType = z.infer<typeof epigramListType>;
