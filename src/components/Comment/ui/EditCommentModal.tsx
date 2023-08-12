import { clsx } from 'clsx';
import ModalWindow from '@/components/ui/ModalWindow/ModalWindow.tsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CommentCredentials,
  CommentValidator,
} from '@/components/Comment/validators/commentScheme.ts';
import Input from '@/components/ui/Input.tsx';
import { IComments } from '@/components/Comment/types/comments.ts';
import { useUpdateUserCommentMutation } from '@/components/Comment/api/comments.api.ts';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface IEditCommentModal {
  isModalActive: boolean;
  setIsModalActive: (arg: boolean) => void;
  comment: IComments;
}

const EditCommentModal = ({
  isModalActive,
  setIsModalActive,
  comment,
}: IEditCommentModal) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentCredentials>({
    resolver: zodResolver(CommentValidator),
    defaultValues: { text: comment?.text },
  });
  const [updateUserComment] = useUpdateUserCommentMutation();

  const onSubmit: SubmitHandler<CommentCredentials> = (data) => {
    updateUserComment({
      args: comment?._id,
      body: data,
    })
      .unwrap()
      .then(() => {
        toast.success('Your comment successfully updated!');
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
          placeholder="Change your comment"
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

export default EditCommentModal;
