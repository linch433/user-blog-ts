import { useLocation, useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '@/app/store/features/posts.api.ts';
import { PageLoader } from '@/components/ui/Loader/Loader.tsx';
import { Comments_T, PostInfoLocationState_T } from '@/types/models.ts';
import { useGetCommentsQuery } from '@/app/store/features/comments.api.ts';
import { handleFollowedComment } from '@/utils/services/HandleFollowedComment.ts';
import PostInfoCard from '@/components/ui/PostsAdditionalInformation/PostInfoCard.tsx';
import CommentsSection from '@/components/ui/PostsAdditionalInformation/CommentsSection.tsx';

const PostsAdditionalInformation = () => {
  const params = useParams();
  const location: PostInfoLocationState_T = useLocation().state;
  const username = location.username;
  let commentsArray: Comments_T[] = [];

  const {
    data: postDetails,
    isLoading: isLoadingPostDetails,
    isError,
  } = useGetPostByIdQuery(params.id as string);
  const { data: comments, isLoading: isLoadingComments } = useGetCommentsQuery(
    params.id as string,
  );

  if (isLoadingPostDetails) return <PageLoader />;
  if (isError) return <div>Something went wrong</div>;

  if (comments) {
    commentsArray = handleFollowedComment(comments);
  }

  return (
    <div>
      <PostInfoCard postDetails={postDetails} username={username} />
      <div className="mt-4">
        <CommentsSection
          isLoadingComments={isLoadingComments}
          commentsArray={commentsArray}
        />
      </div>
    </div>
  );
};

export default PostsAdditionalInformation;
