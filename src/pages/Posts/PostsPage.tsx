import { useState } from 'react';
import { useGetPostsQuery } from '@/app/store/features/posts.api.ts';
import { IPostQuery } from '@/types/models.ts';
import PostCard from '@/components/ui/Post/PostCard.tsx';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { PageLoader } from '@/components/ui/Loader/Loader.tsx';
import NewPostView from '@/components/ui/Post/NewPostView.tsx';

const PostsPage = () => {
  const [countItem, setCountItem] = useState(20);
  const params: IPostQuery = {
    limit: countItem,
  };
  const { data: posts, isLoading, isError } = useGetPostsQuery(params);

  const handleCountItemUpdate = () => {
    setCountItem((prev) => prev + 20);
  };

  if (isLoading) return <PageLoader />;
  if (isError) return <div>Something went wrong</div>;

  return (
    <>
      <NewPostView />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 gap-4 md:space-y-0"
      >
        {posts?.map((post) => <PostCard key={post._id} post={post} />)}
      </motion.div>
      <div className="flex items-center justify-center my-4">
        <button
          onClick={handleCountItemUpdate}
          className={clsx(
            'bg-main-light-blue',
            'cursor-pointer',
            'px-2 py-1 rounded-lg',
            'hover:bg-secondary-dark-blue hover:border',
          )}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default PostsPage;
