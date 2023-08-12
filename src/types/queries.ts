import { IUser } from '@/types/models.ts';
import { INewComment } from '@/components/Comment/types/comments.ts';

export interface IQueriesArgs {
  args: string | undefined;
  body: INewComment | INewPost | Omit<IUser, '_id'>;
}

export interface INewPost {
  title: string;
  fullText: string;
  description?: string;
}

// export interface IEditPostArgs {
//   args: string | undefined;
//   body: INewPost;
// }

export interface IUploadImageArgs {
  args: string | undefined;
  fileData: FormData;
}

// export interface IUpdateUserArgs {
//   args: string | undefined;
//   body: Omit<IUser, '_id'>;
// }
