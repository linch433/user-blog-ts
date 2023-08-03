import { Comments_T } from '@/types/models.ts';
import { useGetUserByIdQuery } from '@/app/store/features/users.api.ts';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store.ts';
import { findLikeOnPost } from '@/utils/services/FindLike.ts';
import { useUserInfoQuery } from '@/app/store/features/api.ts';
import LikeSection from '@/components/ui/LikeSection.tsx';
import { getFormatDate } from '@/utils/services/DateFormat.ts';
import { useSetLikeOnCommentMutation } from '@/app/store/features/comments.api.ts';
import toast from 'react-hot-toast';

interface IComment {
  comment: Comments_T;
}

const Comment = ({ comment }: IComment) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const { data: userInfo } = useUserInfoQuery();

  const { data: username } = useGetUserByIdQuery(comment.commentedBy);
  const [setLikeOnComment] = useSetLikeOnCommentMutation();

  const isLikedPost = findLikeOnPost(comment.likes as string[], userInfo);
  const handleSetLikeOnComment = () => {
    setLikeOnComment(comment._id)
      .unwrap()
      .catch((error) => toast.error(error.data.error));
  };

  return (
    <div>
      <div key={comment._id} className="bg-secondary-dark-blue rounded p-2">
        <p>{comment._id}</p>
        <p>{comment.text}</p>
        <p>{username ? username?.name : 'Unknown user'}</p>
        <p>{comment.followedCommentID}</p>
        <p>{getFormatDate(comment.dateCreated as string)}</p>
        <LikeSection
          isLikedPost={isLikedPost}
          token={token}
          likes={comment.likes}
          setLike={handleSetLikeOnComment}
        />
      </div>
      {comment.followedCommentList?.length !== 0 && (
        <div className="ml-3 mt-10 flex flex-col gap-2">
          {comment.followedCommentList?.map((followedComment) => (
            <div
              key={followedComment._id}
              className="bg-main-light-blue rounded p-2"
            >
              <p>{followedComment.text}</p>
              <p>{followedComment.commentedBy}</p>
              <p>Likes: {followedComment.likes.length}</p>
              <p>{followedComment.dateCreated}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
