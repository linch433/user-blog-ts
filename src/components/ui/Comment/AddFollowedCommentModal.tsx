import { Comments_T } from '@/types/models.ts';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CommentCredentials,
  CommentValidator,
} from '@/app/features/commentScheme.ts';
import { useCreateNewCommentMutation } from '@/app/store/features/comments.api.ts';
import ModalWindow from '@/components/ui/ModalWindow/ModalWindow.tsx';
import { clsx } from 'clsx';
import Input from '@/components/ui/Input.tsx';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface IAddFollowedCommentModal {
  isModalActive: boolean;
  setIsModalActive: (arg: boolean) => void;
  comment: Comments_T;
}

const AddFollowedCommentModal = ({
  isModalActive,
  setIsModalActive,
  comment,
}: IAddFollowedCommentModal) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentCredentials>({ resolver: zodResolver(CommentValidator) });
  const [createNewComment] = useCreateNewCommentMutation();

  const onSubmit: SubmitHandler<CommentCredentials> = (data) => {
    createNewComment({
      args: comment?.postID,
      body: { ...data, followedCommentID: comment._id },
    })
      .unwrap()
      .then(() => {
        toast.success('Your comment successfully added to follow one!');
        setIsModalActive(false);
      })
      .catch((error) => toast.error(error.data.error));
  };

  return (
    <ModalWindow
      active={isModalActive}
      closeModal={() => setIsModalActive(false)}
      height="h-1/6"
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
          name="text"
          placeholder="Add your comment"
          register={register}
          error={errors.text?.message}
        />
        <motion.input
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          className={clsx(
            'bg-main-light-blue',
            'cursor-pointer',
            'px-2 py-1 rounded-lg',
            'hover:bg-secondary-dark-blue hover:border',
          )}
        />
      </form>
    </ModalWindow>
  );
};

export default AddFollowedCommentModal;
