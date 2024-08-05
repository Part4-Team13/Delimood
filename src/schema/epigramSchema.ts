import * as z from 'zod';

/* Post 에피그램 작성 */

// 공통 정의 (tag, id, author, content)
const TagName = z.string().min(1).max(10);
const Id = z.number().int().min(1);
const Author = z.string().min(1).max(30);
const Content = z.string().min(1).max(500);

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
const GetEpigramList = z.object({
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
// 댓글 작성자 정의
const CommentWriter = z.object({
  image: z.string().nullable(),
  nickname: z.string(),
  id: Id,
});

// 댓글 정의
const Comment = z.object({
  epigramId: Id,
  writer: CommentWriter,
  updatedAt: z.string(),
  createdAt: z.string(),
  isPrivate: z.boolean(),
  content: z.string().min(1),
  id: Id,
});

// 페이지네이션 응답 정의
export const CursorBasedPaginationResponse_CommentType = z.object({
  totalCount: z.number(), // 전체 댓글 수
  nextCursor: z.number().nullable(), // 다음 페이지의 커서, null을 허용
  list: z.array(Comment), // 댓글 목록
});

/* 403, 404 에러 */
export const ErrorResponse = z.object({
  message: z.string(),
});
