import { IComments } from '@/types/models.ts';
import Comment from '@/components/ui/Comment/Comment.tsx';

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
