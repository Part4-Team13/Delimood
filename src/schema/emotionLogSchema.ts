import * as z from 'zod';

export const PostEmotionLog = z.object({
  emotion: z.string(),
});

export const GetTodayEmotionLog = z.object({
  createdAt: z.string(),
  emotion: z.string(),
  userId: z.number(),
  id: z.number(),
});

export const GetMonthlyEmotionLogs = z.object({
  createdAt: z.string(),
  emotion: z.string(),
  userId: z.number(),
  id: z.number(),
});

export type PostEmotionLog = z.infer<typeof PostEmotionLog>;
export type GetTodayEmotionLog = z.infer<typeof GetTodayEmotionLog>;
export type GetMonthlyEmotionLogs = z.infer<typeof GetMonthlyEmotionLogs>;
