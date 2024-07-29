import * as z from 'zod';

export const SignUpRequest = z.object({
  email: z.string().email(),
  nickname: z.string(),
  password: z.string(),
  passwordConfirmation: z.string(),
});

export const LoginRequest = z.object({
  email: z.string().email(),
  password: z.string(),
});

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

export type SignUpRequestType = z.infer<typeof SignUpRequest>;
export type LoginRequestType = z.infer<typeof SignUpRequest>;
export type LoginResponseType = z.infer<typeof LoginResponse>;
export type SignUpResponseType = LoginResponseType;
