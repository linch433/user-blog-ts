import { clsx } from 'clsx';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { motion } from 'framer-motion';

interface ILikeSection {
  isLikedPost: string | undefined;
  token: string | null;
  likes: string[] | undefined;
  setLike: () => void;
}

const LikeSection = ({ isLikedPost, token, likes, setLike }: ILikeSection) => {
  return (
    <p
      className={clsx('flex flex-row gap-1', 'items-center', 'text-2xl')}
      onClick={(event) => event.stopPropagation()}
    >
      <motion.span
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
        onClick={setLike}
        className="cursor-pointer"
      >
        {isLikedPost && token ? (
          <AiFillHeart size={30} className="text-rose-800" />
        ) : (
          <AiOutlineHeart size={30} />
        )}
      </motion.span>
      {likes && likes.length}
    </p>
  );
};

export default LikeSection;
