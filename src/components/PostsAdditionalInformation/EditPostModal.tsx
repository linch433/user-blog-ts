import ModalWindow from '@/components/ui/ModalWindow/ModalWindow.tsx';
import Input from '@/components/ui/Input.tsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  PostCreditionals,
  PostValidator,
} from '@/components/Post/validators/postScheme.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { IPost } from '@/components/Post/types/posts.ts';
import { useUpdatePostWithIdMutation } from '@/components/Post/api/posts.api.ts';
import toast from 'react-hot-toast';

interface IEditPostModal {
  isModalActive: boolean;
  setIsModalActive: (args: boolean) => void;
  post: IPost | undefined;
}

const EditPostModal = ({
  isModalActive,
  setIsModalActive,
  post,
}: IEditPostModal) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<PostCreditionals>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      title: post?.title,
      description: post?.description,
      fullText: post?.fullText,
    },
  });
  const [updatePostWithId] = useUpdatePostWithIdMutation();

  const onSubmit: SubmitHandler<PostCreditionals> = (data) => {
    updatePostWithId({
      args: post?._id,
      body: data,
    })
      .unwrap()
      .then(() => {
        toast.success('Your post edited successfully!');
        setIsModalActive(false);
        reset();
      })
      .catch((error) => console.log(error));
  };

  return (
    <ModalWindow
      active={isModalActive}
      closeModal={() => setIsModalActive(false)}
      height="h-3/6"
      width="md:w-2/6"
    >
      <form
        className={clsx(
          'flex flex-col',
          'items-center justify-center gap-4',
          'h-[100%] p-4 ',
        )}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          name="title"
          error={errors.title?.message}
          register={register}
          placeholder="Title"
        />
        <Input
          name="fullText"
          error={errors.fullText?.message}
          register={register}
          placeholder="Full text"
        />
        <Input
          name="description"
          error={errors.description?.message}
          register={register}
          placeholder="Description"
        />
        <motion.input
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          disabled={isSubmitted}
          className={clsx(
            'bg-main-light-blue',
            'cursor-pointer',
            'px-2 py-1 rounded-lg',
            'hover:bg-secondary-dark-blue hover:border',
            'disabled:bg-secondary-light-blue disabled:text-main-smoky-black',
          )}
        />
      </form>
    </ModalWindow>
  );
};

export default EditPostModal;
