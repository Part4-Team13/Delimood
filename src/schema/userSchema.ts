import * as z from 'zod';

export const PatchMeRequest = z.object({
  image: z.string().url(),
  nickname: z.string(),
});

export const IdSchema = z.object({
  id: z.number(),
});

export const GetUserRequest = z.object({
  id: z.number(),
});

export const GetUserReponse = z.object({
  image: z.string(),
  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
  nickname: z.string(),
  teamId: z.string(),
  id: z.number(),
});

export const GetUserCommentRequest = z.object({
  id: z.number(),
  limit: z.number(),
  cursor: z.number().optional(),
});

export const GetUserCommentReponse = z.object({
  totalCount: z.number(),
  nextCursor: z.number(),
  list: z.array(
    z.object({
      epigramId: z.number(),
      writer: z.object({
        image: z.string(),
        nickname: z.string(),
        id: z.number(),
      }),
      updatedAt: z.coerce.date(),
      createdAt: z.coerce.date(),
      isPrivate: z.boolean(),
      content: z.string(),
      id: z.number(),
    }),
  ),
});

export type GetUserReponseType = z.infer<typeof GetUserReponse>;
export type GetUserRequestType = z.infer<typeof GetUserRequest>;
export type PatchMeRequestType = z.infer<typeof PatchMeRequest>;
export type GetUserCommentReponseType = z.infer<typeof GetUserCommentReponse>;
export type GetUserCommentRequestType = z.infer<typeof GetUserCommentRequest>;
