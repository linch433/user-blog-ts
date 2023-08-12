import { SubmitHandler, useForm } from 'react-hook-form';
import {
  PostCreditionals,
  PostValidator,
} from '@/components/Post/validators/postScheme.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/ui/Input.tsx';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useCreatePostMutation } from '@/components/Post/api/posts.api.ts';

const NewPostView = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<PostCreditionals>({
    resolver: zodResolver(PostValidator),
  });
  const [createNewPost] = useCreatePostMutation();

  const onSubmit: SubmitHandler<PostCreditionals> = (data) => {
    createNewPost(data)
      .unwrap()
      .then(() => {
        toast.success('Your post created successfully!');
        reset();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <form
        className={clsx(
          'flex flex-col',
          'items-center justify-center gap-4',
          'h-[100%] p-4',
        )}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          name="title"
          register={register}
          placeholder="Title"
          error={errors.title?.message}
        />
        <Input
          name="fullText"
          register={register}
          placeholder="Full text"
          error={errors.fullText?.message}
        />
        <Input
          name="description"
          register={register}
          placeholder="Description"
          error={errors.description?.message}
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
          )}
        />
      </form>
    </div>
  );
};

export default NewPostView;
