import { IUser } from '@/types/models.ts';
import { additionalUrl } from '@/app/baseUrl.ts';
import PostText from '@/components/ui/Post/PostText.tsx';
import { getFormatDate } from '@/utils/services/DateFormat.ts';
import { motion } from 'framer-motion';
import PropertyIcons from '@/components/ui/PostsAdditionalInformation/PropertyIcons.tsx';
import { ChangeEvent, useState } from 'react';
import toast from 'react-hot-toast';
import ImageUpload from '@/components/ui/ImageUpload.tsx';
import { useUpdateUserImageByIdMutation } from '@/app/store/features/users.api.ts';
import EditProfileModal from '@/components/ui/Profile/EditProfileModal.tsx';

interface IProfileCard {
  userInfo: IUser | undefined;
}

const ProfileCard = ({ userInfo }: IProfileCard) => {
  const [isEditModalActive, setIsEditModalActive] = useState(false);
  const [isShownImageUpload, setIsShownImageUpload] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File>();
  const [updateUserImage] = useUpdateUserImageByIdMutation();

  const handleImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];

    setSelectedImage(file);
  };

  const handleImageUpload = () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('avatar', selectedImage);

    updateUserImage({
      args: userInfo?._id,
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
      <EditProfileModal
        isModalActive={isEditModalActive}
        setIsModalActive={setIsEditModalActive}
        user={userInfo}
      />
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
      <div className="flex items-center justify-center mt-2">
        <PropertyIcons
          setIsImageUploadShow={setIsShownImageUpload}
          setIsEditModalActive={setIsEditModalActive}
        />
      </div>
      <ImageUpload
        isShownImageUpload={isShownImageUpload}
        handleImageUpload={handleImageUpload}
        handleImageSelect={handleImageSelect}
      />
    </motion.div>
  );
};

export default ProfileCard;
