import * as z from 'zod';

/* Post 에피그램 작성 */

// 공통 정의 (tag, id, author, content)
export const TagName = z.string().min(1).max(10);
export const Id = z.number().int().min(1);
export const Author = z.string().min(1).max(30);
export const Content = z.string().min(1).max(500);

//에피그램 작성 Request
export const PostEpigramRequest = z.object({
  tags: z.array(TagName).min(1).max(3),
  referenceUrl: z.string().url(),
  referenceTitle: z.string().max(100),
  author: Author,
  content: Content,
});

//에피그램 작성 Response
export const PostEpigramResponse = z.object({
  likeCount: z.number().nonnegative(),
  tags: z.array(
    z.object({
      name: TagName,
      id: Id,
    }),
  ),
  writerId: Id,
  referenceUrl: z.string().url().nullable(),
  referenceTitle: z.string().max(100).nullable(),
  author: Author,
  content: Content,
  id: Id,
});

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

// Get 에피그램 상세 조회, Get 오늘의 에피그램 조회, Post 에피그램 좋아요, Delete 에피그램 좋아요 취소 Response
export const EpigramDetail = z.object({
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
  isLiked: z.boolean(),
});

/* Patch 에피그램 작성 */
export const UpdateEpigramRequest = z.object({
  tags: z.array(TagName).max(3),
  referenceUrl: z.string().url(),
  referenceTitle: z.string().max(100),
  author: Author,
  content: Content,
});

/* Delete 에피그램 작성 */
export const DeleteResponse = z.object({
  id: Id,
});

/* Get 에피그램 댓글 목록 조회 */

// 1. 댓글 작성자
export const CommentWriter = z.object({
  image: z.string().url(),
  nickname: z.string(),
  id: z.number(),
});

// 2. 댓글 목록
export const Comment = z.object({
  epigramId: z.number(),
  writer: CommentWriter,
  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
  isPrivate: z.boolean(),
  content: z.string(),
  id: z.number(),
});

export const PaginationResponse = z.object({
  totalCount: z.number(),
  nextCursor: z.number(),
  list: z.array(Comment),
});

export type PostEpigramRequestType = z.infer<typeof PostEpigramRequest>;
export type PostEpigramResponseType = z.infer<typeof PostEpigramResponse>;
export type GetEpigramListType = z.infer<typeof GetEpigramList>;
export type GetEpigramListResponseType = z.infer<typeof GetEpigramListResponse>;
export type EpigramDetailType = z.infer<typeof EpigramDetail>;
export type UpdateEpigramRequestType = z.infer<typeof UpdateEpigramRequest>;
export type DeleteResponseType = z.infer<typeof DeleteResponse>;
export type PaginationResponseType = z.infer<typeof PaginationResponse>;
export type PaginationRequest = {
  limit: number;
  cursor?: number;
  keyword?: string;
  writerId?: number;
};
