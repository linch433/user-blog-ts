import { Comments_T } from '@/types/models.ts';

export const handleFollowedComment = (comments: Comments_T[]) => {
  const commentList = [];
  for (let i = 0; i < comments.length; i++) {
    const followedCommentList = [];
    for (let j = 0; j < comments.length; j++) {
      if (comments[i]._id === comments[j].followedCommentID)
        followedCommentList.push(comments[j]);
    }
    if (!comments[i].followedCommentID) {
      commentList.push({ ...comments[i], followedCommentList });
    }
  }
  return commentList;
};
