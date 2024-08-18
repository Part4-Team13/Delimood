import * as z from 'zod';

export const EmotionLogQueryParamsSchema = z.object({
  userId: z.number().positive().int(),
  year: z.number().int().min(1900).max(2100),
  month: z.number().int().min(1).max(12),
});

export const DateRangeSchema = z.union([z.literal('today'), z.literal('monthly')]);

export const EmotionLogRequestSchema = z.object({
  emotion: z.string(),
});

export const EmotionLogSchema = z.object({
  createdAt: z.string(),
  emotion: z.string(),
  userId: z.number(),
  id: z.number(),
});

export const EmotionLogsSchema = z.array(EmotionLogSchema);

export type EmotionLogQueryParamsType = z.infer<typeof EmotionLogQueryParamsSchema>;
export type EmotionLogRequestType = z.infer<typeof EmotionLogRequestSchema>;
export type DateRangeType = z.infer<typeof DateRangeSchema>;
export type EmotionLogResponseType = z.infer<typeof EmotionLogSchema>;
export type EmotionLogsResponseType = z.infer<typeof EmotionLogsSchema>;
