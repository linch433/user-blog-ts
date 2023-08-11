import { INewComment, IUser } from '@/types/models.ts';

export interface INewCommentArgs {
  args: string | undefined;
  body: INewComment;
}

export interface INewPost {
  title: string;
  fullText: string;
  description?: string;
}

export interface IEditPostArgs {
  args: string | undefined;
  body: INewPost;
}

export interface IUploadImageArgs {
  args: string | undefined;
  fileData: FormData;
}

export interface IUpdateUserArgs {
  args: string | undefined;
  body: Omit<IUser, '_id'>;
}
