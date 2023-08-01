import { useState } from 'react';
import { useGetPostsQuery } from '@/app/store/features/posts.api.ts';
import { PostQuery_T } from '@/types/models.ts';
import PostCard from '@/components/ui/PostCard.tsx';
import { clsx } from 'clsx';

const PostsPage = () => {
  const [countItem, setCountItem] = useState(20);
  const params: PostQuery_T = {
    limit: countItem,
  };
  const { data: posts, isLoading, isError } = useGetPostsQuery(params);

  const handleCountItemUpdate = () => {
    setCountItem((prev) => prev + 20);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;

  return (
    <>
      <div className="flex flex-col gap-4">
        {posts?.map((post) => <PostCard key={post._id} post={post} />)}
      </div>
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
