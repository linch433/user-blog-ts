import PostText from '@/components/ui/Post/PostText.tsx';
import { getFormatDate } from '@/utils/services/DateFormat.ts';
import { additionalUrl } from '@/app/baseUrl.ts';
import { IPost } from '@/types/models.ts';
import { useUserInfoQuery } from '@/app/store/features/api.ts';
import { ChangeEvent, useState } from 'react';
import EditPostModal from '@/components/ui/PostsAdditionalInformation/EditPostModal.tsx';
import PropertyIcons from '@/components/ui/PostsAdditionalInformation/PropertyIcons.tsx';
import ImageUpload from '@/components/ui/ImageUpload.tsx';
import { useUpdatePostImageWithIdMutation } from '@/app/store/features/posts.api.ts';
import toast from 'react-hot-toast';

interface IPostInfoCard {
  postDetails: IPost | undefined;
  username: string;
}

const PostInfoCard = ({ postDetails, username }: IPostInfoCard) => {
  const [isEditModalActive, setIsEditModalActive] = useState(false);
  const [isShownImageUpload, setIsShownImageUpload] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File>();
  const { data: user } = useUserInfoQuery();
  const [updatePostImage] = useUpdatePostImageWithIdMutation();

  const handleImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];

    setSelectedImage(file);
  };

  const handleImageUpload = () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('image', selectedImage);

    updatePostImage({
      args: postDetails?._id,
      fileData: formData,
    })
      .unwrap()
      .then(() => {
        toast.success('Your image for this post successfully uploaded!');
        setIsShownImageUpload(false);
      })
      .catch((error) =>
        toast.error(error.data.error && error.data.error.message),
      );
  };

  return (
    <div>
      <div className="flex flex-row justify-between">
        <EditPostModal
          isModalActive={isEditModalActive}
          setIsModalActive={setIsEditModalActive}
          post={postDetails}
        />
        <PostText title="Title" text={postDetails?.title} />
        {username === user?.name && (
          <PropertyIcons
            setIsImageUploadShow={setIsShownImageUpload}
            setIsEditModalActive={setIsEditModalActive}
          />
        )}
      </div>
      <PostText title="Full text" text={postDetails?.fullText} />
      <PostText title="Description" text={postDetails?.description} />
      <PostText
        title="Date created"
        text={getFormatDate(postDetails?.dateCreated as string)}
      />
      <PostText title="Posted by" text={username} />
      <PostText title="Likes" text={postDetails?.likes?.length} />
      {postDetails?.image && (
        <div className="flex justify-center m-2">
          <img
            alt={`Image for ${postDetails?.title} post`}
            src={`${additionalUrl + postDetails?.image}`}
            loading="lazy"
            className="bg-contain w-96 rounded"
          />
        </div>
      )}
      <ImageUpload
        isShownImageUpload={isShownImageUpload}
        handleImageUpload={handleImageUpload}
        handleImageSelect={handleImageSelect}
      />
    </div>
  );
};

export default PostInfoCard;
