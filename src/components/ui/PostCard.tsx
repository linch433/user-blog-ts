import { getFormatDate } from '@/utils/services/DateFormat.ts';
import { additionalUrl } from '@/app/baseUrl.ts';
import { Post_T } from '@/types/models.ts';
import { useGetUserByIdQuery } from '@/app/store/features/users.api.ts';
import { AiOutlineHeart } from 'react-icons/ai';
import PostText from '@/components/ui/PostText.tsx';

interface IPostCard {
  post: Post_T;
}

const PostCard = ({ post }: IPostCard) => {
  const {
    postedBy,
    description,
    fullText,
    image,
    likes,
    title,
    dateCreated,
    _id,
  } = post;
  const { data: user } = useGetUserByIdQuery(postedBy);

  return (
    <div key={_id} className="bg-secondary-dark-blue rounded p-4">
      <PostText title="Title" text={title} />
      <PostText title="Full text" text={fullText} />
      <PostText title="Description" text={description} />
      <PostText
        title="Date created"
        text={getFormatDate(dateCreated as string)}
      />
      <PostText
        title="Posted by"
        text={user?.name ? user?.name : 'Unknown user'}
      />
      {image && (
        <div className="flex justify-center mt-2">
          <img
            alt={`Image for ${title} post`}
            src={`${additionalUrl + image}`}
            loading="lazy"
            className="bg-contain w-96 rounded"
          />
        </div>
      )}
      <p className="flex flex-row items-center gap-1 text-2xl mt-4">
        <AiOutlineHeart size={30} />
        {likes && likes.length}
      </p>
    </div>
  );
};

export default PostCard;
