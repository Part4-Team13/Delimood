import * as z from 'zod';

export const PatchMeRequest = z.object({
  image: z.string().url().optional(),
  nickname: z.string().optional(),
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

export type GetUserReponseType = z.infer<typeof GetUserReponse>;
export type GetUserRequestType = z.infer<typeof GetUserRequest>;
export type PatchMeRequestType = z.infer<typeof PatchMeRequest>;
export type GetUserCommentRequestType = z.infer<typeof GetUserCommentRequest>;
