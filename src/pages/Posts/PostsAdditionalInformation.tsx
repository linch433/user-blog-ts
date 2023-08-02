import PostText from '@/components/ui/PostText.tsx';
import { useLocation, useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '@/app/store/features/posts.api.ts';
import { PageLoader } from '@/components/ui/Loader/Loader.tsx';
import { getFormatDate } from '@/utils/services/DateFormat.ts';
import { additionalUrl } from '@/app/baseUrl.ts';
import { PostInfoLocationState_T } from '@/types/models.ts';

const PostsAdditionalInformation = () => {
  const params = useParams();
  const location: PostInfoLocationState_T = useLocation().state;
  const username = location.username;

  const {
    data: postDetails,
    isLoading,
    isError,
  } = useGetPostByIdQuery(params.id as string);

  if (isLoading) return <PageLoader />;
  if (isError) return <div>Something went wrong</div>;

  console.log(postDetails);

  return (
    <div>
      <PostText title="Title" text={postDetails?.title} />
      <PostText title="Full text" text={postDetails?.fullText} />
      <PostText title="Description" text={postDetails?.description} />
      <PostText
        title="Date created"
        text={getFormatDate(postDetails?.dateCreated as string)}
      />
      <PostText title="Posted by" text={username} />
      <PostText title="Likes" text={postDetails?.likes?.length} />
      {postDetails?.image && (
        <div className="flex justify-center mt-2">
          <img
            alt={`Image for ${postDetails?.title} post`}
            src={`${additionalUrl + postDetails?.image}`}
            loading="lazy"
            className="bg-contain w-96 rounded"
          />
        </div>
      )}
    </div>
  );
};

export default PostsAdditionalInformation;
