import { z } from 'zod';

export const RegisterValidator = z.object({
  email: z
    .string()
    .email({ message: 'Email field must be required as an email' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
  name: z.string(),
  extra_details: z.string(),
  skills: z.string(),
  profession: z.string(),
  details: z.string(),
});

export type RegisterCredentials = z.infer<typeof RegisterValidator>;
