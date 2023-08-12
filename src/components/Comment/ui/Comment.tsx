import { IComments } from '@/components/Comment/types/comments.ts';
import { useGetUserByIdQuery } from '@/app/store/features/users.api.ts';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store.ts';
import { findLikeOnPostOrComment } from '@/utils/helpers/FindLike.ts';
import { useUserInfoQuery } from '@/components/Profile/api/profile.api.ts';
import LikeSection from '@/components/ui/LikeSection.tsx';
import { getFormatDate } from '@/utils/helpers/DateFormat.ts';
import { useSetLikeOnCommentMutation } from '@/components/Comment/api/comments.api.ts';
import toast from 'react-hot-toast';
import FollowedComment from '@/components/Comment/ui/FollowedComment.tsx';
import { clsx } from 'clsx';
import { BsFillReplyFill } from 'react-icons/bs';
import { BiSolidEdit } from 'react-icons/bi';
import HoverContainer from '@/components/ui/HoverContainer.tsx';
import { useState } from 'react';
import EditCommentModal from '@/components/Comment/ui/EditCommentModal.tsx';
import AddFollowedCommentModal from '@/components/Comment/ui/AddFollowedCommentModal.tsx';

interface IComment {
  comment: IComments;
}

const Comment = ({ comment }: IComment) => {
  const [isModalToEditActive, setIsModalToEditActive] = useState(false);
  const [isModalToAddFollowedActive, setIsModalToAddFollowedActive] =
    useState(false);

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
        <EditCommentModal
          isModalActive={isModalToEditActive}
          setIsModalActive={setIsModalToEditActive}
          comment={comment}
        />
        <AddFollowedCommentModal
          isModalActive={isModalToAddFollowedActive}
          setIsModalActive={setIsModalToAddFollowedActive}
          comment={comment}
        />
        <div className="flex justify-between">
          <p className="truncate">{comment.text}</p>
          {userInfo?._id === comment.commentedBy && (
            <HoverContainer>
              <BiSolidEdit
                size={30}
                onClick={() => setIsModalToEditActive(true)}
              />
            </HoverContainer>
          )}
        </div>
        <p className="truncate">{username ? username?.name : 'Unknown user'}</p>
        <p>{getFormatDate(comment.dateCreated as string)}</p>
        <div className="flex justify-between mt-4">
          <LikeSection
            isLikedPost={isLikedComment}
            token={token}
            likes={comment.likes}
            setLike={handleSetLikeOnComment}
          />
          <HoverContainer>
            <BsFillReplyFill
              size={30}
              onClick={() => setIsModalToAddFollowedActive(true)}
            />
          </HoverContainer>
        </div>
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
          />
        ))}
      </div>
    </div>
  );
};

export default Comment;
