import * as z from 'zod';

//FIX:"필수입력입니다"라는 메시지가 다른 메시지에 덮여쓰여져 안보임.
export const SignUpRequest = z
  .object({
    email: z.string().nonempty({ message: '이메일은 필수 입력입니다.' }).email({ message: '이메일 형식으로 작성해 주세요.' }),
    nickname: z.string().nonempty({ message: '닉네임은 필수 입력입니다.' }).max(20, { message: '닉네임은 최대 20자까지 가능합니다.' }),
    password: z
      .string()
      .nonempty({ message: '비밀번호는 필수 입력입니다.' })
      .min(8, { message: '비밀번호는 최소 8자 이상입니다.' })
      .regex(/^[a-zA-Z0-9!@#$%^&*]+$/, { message: '비밀번호는 숫자, 영문, 특수문자로만 가능합니다.' }),
    passwordConfirmation: z.string().nonempty({ message: '비밀번호 확인을 입력해주세요.' }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirmation'],
  });

export const LoginRequest = z.object({
  email: z.string().nonempty({ message: '이메일은 필수 입력입니다.' }).email({ message: '이메일 형식으로 작성해 주세요.' }),
  password: z.string().nonempty({ message: '비밀번호는 필수 입력입니다.' }),
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
export type LoginRequestType = z.infer<typeof LoginRequest>;
export type LoginResponseType = z.infer<typeof LoginResponse>;
export type SignUpResponseType = LoginResponseType;
