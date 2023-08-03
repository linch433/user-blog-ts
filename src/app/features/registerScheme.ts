import { z } from 'zod';
import { NewUser_T } from '@/types/models.ts';

export const RegisterValidator = z.object({
  email: z
    .string()
    .nonempty({ message: 'Email is not allowed to be empty' })
    .email({ message: 'Email field must be a valid email' }),
  password: z
    .string()
    .min(5, { message: 'Password must be at least 5 characters long' })
    .max(10, {
      message: 'Password must be at less or equal to 10 characters long',
    }),
  name: z.string(),
  extra_details: z.string(),
  skills: z.string(),
  profession: z.string(),
  details: z.string(),
});

export const defaultRegisterValues: NewUser_T = {
  details: '',
  email: '',
  extra_details: '',
  name: '',
  skills: '',
  password: '',
  profession: '',
};

export type RegisterCredentials = z.infer<typeof RegisterValidator>;
