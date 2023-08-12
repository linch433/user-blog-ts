import { useLocation, useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '@/components/Post/api/posts.api.ts';
import { PageLoader } from '@/components/ui/Loader/Loader.tsx';
import { IComments } from '@/components/Comment/types/comments.ts';
import { useGetCommentsQuery } from '@/components/Comment/api/comments.api.ts';
import { handleFollowedComment } from '@/utils/helpers/HandleFollowedComment';
import PostInfoCard from '@/components/PostsAdditionalInformation/PostInfoCard.tsx';
import CommentsSection from '@/components/PostsAdditionalInformation/CommentsSection.tsx';
import CommentInput from '@/components/Comment/ui/CommentInput.tsx';

const PostsAdditionalInformation = () => {
  const params = useParams();
  const location: {
    username: string;
  } = useLocation().state;
  const username = location.username;
  let commentsArray: IComments[] = [];

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
      <div className="my-4">
        <CommentInput postId={postDetails?._id} />
        <CommentsSection
          isLoadingComments={isLoadingComments}
          commentsArray={commentsArray}
        />
      </div>
    </div>
  );
};

export default PostsAdditionalInformation;
