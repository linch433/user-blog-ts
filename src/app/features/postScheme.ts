import { z } from 'zod';

export const PostValidator = z.object({
  title: z
    .string()
    .nonempty('Title is not allowed to be empty')
    .min(5, { message: 'Title length must be at least 5 characters long' })
    .max(50, {
      message: 'Title length must be less that or equal to 50 characters long',
    }),
  fullText: z
    .string()
    .nonempty('FullText field is not allowed to be empty')
    .min(20, {
      message: 'FullText length must be at least 20 characters long',
    }),
  description: z.string(),
});

export type PostCreditionals = z.infer<typeof PostValidator>;
