import PostText from '@/components/ui/Post/PostText.tsx';
import { getFormatDate } from '@/utils/services/DateFormat.ts';
import { additionalUrl } from '@/app/baseUrl.ts';
import { Post_T } from '@/types/models.ts';

interface IPostInfoCard {
  postDetails: Post_T | undefined;
  username: string;
}

const PostInfoCard = ({ postDetails, username }: IPostInfoCard) => {
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

export default PostInfoCard;
