import { clsx } from 'clsx';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ILikeSection {
  isLikedPost: boolean;
  token: string | null;
  likes: string[] | undefined;
  setLike: () => void;
}

const LikeSection = ({ isLikedPost, token, likes, setLike }: ILikeSection) => {
  const [like, setLikes] = useState(likes?.length);
  const [isPostLiked, setIsLikedPost] = useState(false);

  useEffect(() => {
    setIsLikedPost(isLikedPost);
  }, [isLikedPost]);

  const handleLikeClick = () => {
    if (isPostLiked) {
      setLikes((prev) => (prev ? prev - 1 : 0));
      setIsLikedPost((prev) => !prev);
      setLike();
    }

    if (!isPostLiked) {
      setLikes((prev) => (prev ? prev + 1 : 1));
      setIsLikedPost((prev) => !prev);
      setLike();
    }
  };

  return (
    <p
      className={clsx('flex flex-row gap-1', 'items-center', 'text-2xl')}
      onClick={(event) => event.stopPropagation()}
    >
      <motion.span
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
        onClick={handleLikeClick}
        className="cursor-pointer"
      >
        {isPostLiked && token ? (
          <AiFillHeart size={30} className="text-rose-800" />
        ) : (
          <AiOutlineHeart size={30} />
        )}
      </motion.span>
      {like}
    </p>
  );
};

export default LikeSection;
