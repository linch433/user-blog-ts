export interface ILoginUser {
  email: string;
  password: string;
}

export interface IUser {
  _id: string;
  email?: string;
  name?: string;
  avatar?: string;
  extra_details?: string;
  skills?: string;
  profession?: string;
  details?: string;
  dateCreated?: string;
}

export interface IGeneralQuery {
  limit?: number;
  skip?: number;
}

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

export interface INewUser {
  email: string;
  password: string;
  name: string;
  extra_details: string;
  skills: string;
  profession: string;
  details: string;
}

export interface IComments {
  _id: string;
  commentedBy: string;
  followedCommentID?: string | null;
  postID: string;
  text: string;
  dateCreated: string;
  likes: string[];
  followedCommentList?: IComments[];
}

export interface INewComment {
  text: string;
  followedCommentID?: string;
}
