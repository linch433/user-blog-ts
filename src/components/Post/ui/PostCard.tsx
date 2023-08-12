import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { additionalUrl } from '@/app/baseUrl.ts';
import { useGetUserByIdQuery } from '@/app/store/features/users.api.ts';
import { useUserInfoQuery } from '@/components/Profile/api/profile.api.ts';
import { useSetLikeForPostByIdMutation } from '@/components/Post/api/posts.api.ts';
import { RootState } from '@/app/store/store.ts';
import { getFormatDate } from '@/utils/helpers/DateFormat.ts';
import { findLikeOnPostOrComment } from '@/utils/helpers/FindLike.ts';
import { IPost } from '@/components/Post/types/posts.ts';
import PostText from '@/components/Post/ui/PostText.tsx';
import LikeSection from '@/components/ui/LikeSection.tsx';
import toast from 'react-hot-toast';
import { clsx } from 'clsx';

interface IPostCard {
  post: IPost;
}

const PostCard = ({ post }: IPostCard) => {
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const { postedBy, description, image, likes, title, dateCreated, _id } = post;
  const { data: user } = useGetUserByIdQuery(postedBy);
  const { data: userInfo } = useUserInfoQuery();
  const [setLikeOnPost] = useSetLikeForPostByIdMutation();

  const isLikedPost = findLikeOnPostOrComment(likes as string[], userInfo);

  const handleSetLikeForPost = () => {
    setLikeOnPost(_id)
      .unwrap()
      .catch((error) => toast.error(error?.data.error));
  };

  const handleNavigationToAdditionalInfo = () => {
    navigate(`/posts/${_id}`, {
      state: { username: user?.name ? user?.name : 'Unknown user' },
    });
  };

  return (
    <div
      key={_id}
      className={clsx('bg-secondary-dark-blue', 'rounded p-4 cursor-pointer')}
      onClick={handleNavigationToAdditionalInfo}
    >
      <PostText title="Title" text={title} />
      <PostText title="Description" text={description} />
      <PostText
        title="Date created"
        text={getFormatDate(dateCreated as string)}
      />
      <PostText
        title="Posted by"
        text={user?.name ? user?.name : 'Unknown user'}
      />
      {image && (
        <div className="flex justify-center mt-2">
          <img
            alt={`Image for ${title} post`}
            src={`${additionalUrl + image}`}
            loading="lazy"
            className="bg-contain w-96 rounded"
          />
        </div>
      )}
      <LikeSection
        isLikedPost={isLikedPost}
        token={token}
        likes={likes}
        setLike={handleSetLikeForPost}
      />
    </div>
  );
};

export default PostCard;
