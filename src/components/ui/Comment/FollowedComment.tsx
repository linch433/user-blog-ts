import { getFormatDate } from '@/utils/services/DateFormat.ts';
import LikeSection from '@/components/ui/LikeSection.tsx';
import { Comments_T, User_T } from '@/types/models.ts';
import { findLikeOnPostOrComment } from '@/utils/services/FindLike.ts';
import { useSetLikeOnCommentMutation } from '@/app/store/features/comments.api.ts';
import { useGetUserByIdQuery } from '@/app/store/features/users.api.ts';
import toast from 'react-hot-toast';
import Comment from '@/components/ui/Comment/Comment.tsx';

interface IFollowedComment {
  followedComment: Comments_T;
  token: string | null;
  userInfo: User_T | undefined;
}

const FollowedComment = ({
  followedComment,
  token,
  userInfo,
}: IFollowedComment) => {
  const [setLikeOnFollowedComment] = useSetLikeOnCommentMutation();
  const { data: username } = useGetUserByIdQuery(followedComment.commentedBy);
  const isLikedFollowedComment = findLikeOnPostOrComment(
    followedComment.likes as string[],
    userInfo,
  );

  const handleSetLikeOnComment = () => {
    setLikeOnFollowedComment(followedComment._id)
      .unwrap()
      .catch((error) => toast.error(error.data.error));
  };

  return (
    <div key={followedComment._id}>
      <Comment comment={followedComment} />
    </div>
  );
};

export default FollowedComment;
