import Hashids from 'hashids';
import { z } from 'zod';

export const CommentDtoSchema = z.object({
  id: z.string(),
  cardId: z.number(),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
  rating: z.number(),
  title: z.string().min(1).max(30),
  content: z.string().min(1).max(600),
  userId: z.string(),
  userInfo: z.object({
    username: z.string().nullable().optional(),
    imageUrl: z.string().nullable().optional(),
  }),
  likes: z.number().nullable().optional(),
});
export type CommentDto = z.infer<typeof CommentDtoSchema>;
export const CommentHashids = new Hashids('comment');
