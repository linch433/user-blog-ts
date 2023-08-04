export type AuthTokenResponse_T = {
  token: string;
};

export type LoginUser_T = {
  email: string;
  password: string;
};

export type User_T = {
  _id: string;
  email?: string | null;
  name?: string | null;
  avatar?: string | null;
  extra_details?: string | null;
  skills?: string | null;
  profession?: string | null;
  details?: string | null;
  dateCreated?: string | null;
};

export type UserQuery_T = {
  limit?: number;
  skip?: number;
};

export type Post_T = {
  _id: string;
  title?: string;
  fullText?: string;
  description?: string;
  dateCreated?: string;
  image?: string;
  likes?: string[];
  postedBy: string;
};

export type PostQuery_T = {
  search?: string;
  postedBy?: string;
  limit?: number;
  skip?: number;
};

export type PostInfoLocationState_T = {
  username: string;
};

export type NewUser_T = {
  email: string;
  password: string;
  name: string;
  extra_details: string;
  skills: string;
  profession: string;
  details: string;
};

export type Comments_T = {
  _id: string;
  commentedBy: string;
  followedCommentID?: string | null;
  postID: string;
  text: string;
  dateCreated: string;
  likes: string[];
  followedCommentList?: Comments_T[];
};
