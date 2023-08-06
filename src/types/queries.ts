import { NewComment_T, User_T } from '@/types/models.ts';

export type NewCommentArgs_T = {
  args: string | undefined;
  body: NewComment_T;
};

type EditPost_T = {
  title: string;
  fullText: string;
  description?: string;
};

export type EditPostArgs_T = {
  args: string | undefined;
  body: EditPost_T;
};

export type UploadImageArgs_T = {
  args: string | undefined;
  fileData: FormData;
};

export type UpdateUserArgs_T = {
  args: string | undefined;
  body: Omit<User_T, '_id'>;
};
