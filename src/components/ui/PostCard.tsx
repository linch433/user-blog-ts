import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { additionalUrl } from '@/app/baseUrl.ts';
import { useGetUserByIdQuery } from '@/app/store/features/users.api.ts';
import { useUserInfoQuery } from '@/app/store/features/api.ts';
import { useSetLikeForPostByIdMutation } from '@/app/store/features/posts.api.ts';
import { RootState } from '@/app/store/store.ts';
import { getFormatDate } from '@/utils/services/DateFormat.ts';
import { findLikeOnPost } from '@/utils/services/FindLike.ts';
import { Post_T } from '@/types/models.ts';
import PostText from '@/components/ui/PostText.tsx';
import LikeSection from '@/components/ui/LikeSection.tsx';
import toast from 'react-hot-toast';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface IPostCard {
  post: Post_T;
}

const PostCard = ({ post }: IPostCard) => {
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const { postedBy, description, image, likes, title, dateCreated, _id } = post;
  const { data: user } = useGetUserByIdQuery(postedBy);
  const { data: userInfo } = useUserInfoQuery();
  const [setLikeOnPost] = useSetLikeForPostByIdMutation();

  const isLikedPost = findLikeOnPost(likes as string[], userInfo?._id);

  const handleSetLikeForPost = () => {
    setLikeOnPost(_id)
      .unwrap()
      .catch((error) => toast.error(error?.data.error));
  };

  const handleNavigationToAdditionalInfo = () => {
    navigate(`${_id}`, {
      state: { username: user?.name ? user?.name : 'Unknown user' },
    });
  };

  return (
    <motion.div
      key={_id}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className={clsx(
        'bg-secondary-dark-blue',
        'rounded p-4 cursor-pointer',
        'hover:my-2',
      )}
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
    </motion.div>
  );
};

export default PostCard;
