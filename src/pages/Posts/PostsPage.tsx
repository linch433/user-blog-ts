import { useEffect, useState } from 'react';
import { useGetPostsQuery } from '@/components/Post/api/posts.api.ts';
import { IPostQuery } from '@/components/Post/types/posts.ts';
import PostCard from '@/components/Post/ui/PostCard.tsx';
import { motion } from 'framer-motion';
import Loader, { PageLoader } from '@/components/ui/Loader/Loader.tsx';
import NewPostView from '@/components/Post/ui/NewPostView.tsx';

const PostsPage = () => {
  const [page, setPage] = useState(1);
  const params: IPostQuery = {
    limit: page * 20,
  };
  const {
    data: posts,
    isLoading,
    isError,
    isFetching,
  } = useGetPostsQuery(params);

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;

      if (scrolledToBottom && !isFetching) {
        setPage((prev) => prev + 1);
      }
    };

    document.addEventListener('scroll', onScroll);

    return function () {
      document.removeEventListener('scroll', onScroll);
    };
  }, [page, isFetching]);

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
        {isFetching && <Loader />}
      </div>
    </>
  );
};

export default PostsPage;
