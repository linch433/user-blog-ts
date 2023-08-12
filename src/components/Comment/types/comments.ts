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
