import { IComments } from '@/components/Comment/types/comments.ts';
import Comment from '@/components/Comment/ui/Comment.tsx';

interface IFollowedComment {
  followedComment: IComments;
}

const FollowedComment = ({ followedComment }: IFollowedComment) => {
  return (
    <div key={followedComment._id}>
      <Comment comment={followedComment} />
    </div>
  );
};

export default FollowedComment;
