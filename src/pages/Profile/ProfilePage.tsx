import { useUserInfoQuery } from '@/app/store/features/api.ts';
import { PageLoader } from '@/components/ui/Loader/Loader.tsx';
import { motion } from 'framer-motion';
import { useGetPostsQuery } from '@/app/store/features/posts.api.ts';
import { PostQuery_T } from '@/types/models.ts';
import PostCard from '@/components/ui/Post/PostCard.tsx';
import ProfileCard from '@/components/ui/Profile/ProfileCard.tsx';

const ProfilePage = () => {
  const { data: userInfo, isLoading, isError } = useUserInfoQuery();
  const postsParams: PostQuery_T = {
    postedBy: userInfo?._id,
  };
  const { data: posts } = useGetPostsQuery(postsParams);

  if (isLoading) return <PageLoader />;
  if (isError) return <div>Something went wrong</div>;

  return (
    <>
      <ProfileCard userInfo={userInfo} />
      <p className="text-xl font-bold mt-4">Post section</p>
      <div className="grid grid-cols-1 gap-4 mb-4">
        {posts?.map((userPost) => (
          <motion.div
            key={userPost._id}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <PostCard key={userPost._id} post={userPost} />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default ProfilePage;
