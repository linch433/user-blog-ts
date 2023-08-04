import { useUserInfoQuery } from '@/app/store/features/api.ts';
import { additionalUrl } from '@/app/baseUrl.ts';
import { PageLoader } from '@/components/ui/Loader/Loader.tsx';
import { motion } from 'framer-motion';
import PostText from '@/components/ui/Post/PostText.tsx';
import { getFormatDate } from '@/utils/services/DateFormat.ts';
import { useGetPostsQuery } from '@/app/store/features/posts.api.ts';
import { PostQuery_T } from '@/types/models.ts';
import PostCard from '@/components/ui/Post/PostCard.tsx';

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
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.3,
          ease: [0, 0.5, 0.2, 0.5],
          scale: {
            type: 'spring',
            damping: 10,
            stiffness: 50,
            restDelta: 0.01,
          },
        }}
        className="bg-secondary-dark-blue p-4 rounded-xl"
      >
        {userInfo?.avatar && (
          <img
            src={`${additionalUrl}${userInfo?.avatar}`}
            alt="Profile img"
            className="mb-2 rounded-lg"
            loading="lazy"
          />
        )}
        <PostText title="Name" text={userInfo?.name as string} />
        <PostText title="Email" text={userInfo?.email as string} />
        <PostText title="Details" text={userInfo?.details as string} />
        <PostText title="Skills" text={userInfo?.skills as string} />
        <PostText
          title="Date created"
          text={getFormatDate(userInfo?.dateCreated as string)}
        />
        <PostText
          title="Extra details"
          text={userInfo?.extra_details as string}
        />
        <PostText title="Profession" text={userInfo?.profession as string} />
      </motion.div>
      <motion.div className="my-4">
        <p className="text-xl font-bold">Post section</p>
        <div className="grid grid-cols-1 gap-4">
          {posts?.map((userPost) => (
            <PostCard key={userPost._id} post={userPost} />
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default ProfilePage;
