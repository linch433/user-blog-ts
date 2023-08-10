import { z } from 'zod';

export const UserValidator = z.object({
  name: z.string(),
  extra_details: z.string(),
  skills: z.string(),
  profession: z.string(),
  details: z.string(),
});

export type UserCreditionals = z.infer<typeof UserValidator>;
