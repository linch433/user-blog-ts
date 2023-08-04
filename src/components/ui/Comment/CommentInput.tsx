import { SubmitHandler, useForm } from 'react-hook-form';
import {
  CommentCredentials,
  CommentValidator,
} from '@/app/features/commentScheme.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/ui/Input.tsx';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { useCreateNewCommentMutation } from '@/app/store/features/comments.api.ts';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

interface ICommentInput {
  postId: string | undefined;
}

const CommentInput = ({ postId }: ICommentInput) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<CommentCredentials>({
    resolver: zodResolver(CommentValidator),
  });
  const [createNewComment] = useCreateNewCommentMutation();

  const onSubmit: SubmitHandler<CommentCredentials> = (data) => {
    createNewComment({ args: postId, body: data })
      .unwrap()
      .then(() => toast.success('Your comment successfully uploaded!'))
      .catch((error) => toast.error(error.data.error));
  };

  useEffect(() => {
    reset({ text: '' });
  }, [isSubmitSuccessful]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 mb-6"
    >
      <Input
        register={register}
        placeholder={'Write your comment here'}
        name="text"
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
  );
};

export default CommentInput;
