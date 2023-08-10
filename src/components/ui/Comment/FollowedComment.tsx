import { Comments_T } from '@/types/models.ts';
import Comment from '@/components/ui/Comment/Comment.tsx';

interface IFollowedComment {
  followedComment: Comments_T;
}

const FollowedComment = ({ followedComment }: IFollowedComment) => {
  return (
    <div key={followedComment._id}>
      <Comment comment={followedComment} />
    </div>
  );
};

export default FollowedComment;
