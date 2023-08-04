import { Comments_T } from '@/types/models.ts';
import { useGetUserByIdQuery } from '@/app/store/features/users.api.ts';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store.ts';
import { findLikeOnPostOrComment } from '@/utils/services/FindLike.ts';
import { useUserInfoQuery } from '@/app/store/features/api.ts';
import LikeSection from '@/components/ui/LikeSection.tsx';
import { getFormatDate } from '@/utils/services/DateFormat.ts';
import { useSetLikeOnCommentMutation } from '@/app/store/features/comments.api.ts';
import toast from 'react-hot-toast';
import FollowedComment from '@/components/ui/Comment/FollowedComment.tsx';
import { clsx } from 'clsx';

interface IComment {
  comment: Comments_T;
}

const Comment = ({ comment }: IComment) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const { data: userInfo } = useUserInfoQuery();

  const { data: username } = useGetUserByIdQuery(comment.commentedBy);
  const [setLikeOnComment] = useSetLikeOnCommentMutation();

  const isLikedComment = findLikeOnPostOrComment(
    comment.likes as string[],
    userInfo,
  );

  const handleSetLikeOnComment = () => {
    setLikeOnComment(comment._id)
      .unwrap()
      .catch((error) => toast.error(error.data.error));
  };

  return (
    <div>
      <div key={comment._id} className="bg-secondary-dark-blue rounded p-2">
        <p className="truncate">{comment.text}</p>
        <p className="truncate">{username ? username?.name : 'Unknown user'}</p>
        <p>{comment.followedCommentID}</p>
        <p>{getFormatDate(comment.dateCreated as string)}</p>
        <LikeSection
          isLikedPost={isLikedComment}
          token={token}
          likes={comment.likes}
          setLike={handleSetLikeOnComment}
        />
      </div>
      <div
        className={clsx(
          comment.followedCommentList?.length !== 0 &&
            'ml-6 mt-4 grid grid-cols-1 gap-2',
        )}
      >
        {comment.followedCommentList?.map((followedComment) => (
          <FollowedComment
            key={followedComment._id}
            followedComment={followedComment}
            token={token}
            userInfo={userInfo}
          />
        ))}
      </div>
    </div>
  );
};

export default Comment;
