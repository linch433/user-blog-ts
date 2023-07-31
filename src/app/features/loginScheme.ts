import { z } from 'zod';

export const LoginValidator = z.object({
  email: z
    .string()
    .email({ message: 'Email field must be required as an email' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});

export type LoginCredentials = z.infer<typeof LoginValidator>;
