import { z } from 'zod';

export const LoginValidator = z.object({
  email: z
    .string()
    .email({ message: 'Email field must be required as an email' }),
  password: z
    .string()
    .min(5, { message: 'Password must be at least 5 characters long' })
    .max(10, {
      message: 'Password must be at less or equal to 10 characters long',
    }),
});

export type LoginCredentials = z.infer<typeof LoginValidator>;
