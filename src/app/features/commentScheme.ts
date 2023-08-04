import { z } from 'zod';

export const CommentValidator = z.object({
  text: z
    .string()
    .nonempty({ message: 'Comment section is not allowed to be empty' }),
});

export type CommentCredentials = z.infer<typeof CommentValidator>;
