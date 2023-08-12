import { IGeneralQuery } from '@/types/models.ts';

export interface IPost {
  _id: string;
  title?: string;
  fullText?: string;
  description?: string;
  dateCreated?: string;
  image?: string;
  likes?: string[];
  postedBy: string;
}

export interface IPostQuery extends IGeneralQuery {
  search?: string;
  postedBy?: string;
}
