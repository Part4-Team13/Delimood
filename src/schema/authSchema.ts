import * as z from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  nickname: z.string(),
  teamId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  image: z.string().url(),
  email: z.string().email(),
});

export const LoginResponse = z.object({
  user: UserSchema,
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type LoginResponseType = z.infer<typeof LoginResponse>;
