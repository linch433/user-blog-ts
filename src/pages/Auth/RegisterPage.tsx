import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  RegisterCredentials,
  RegisterValidator,
} from '@/app/validators/registerScheme.ts';
import Input from '@/components/ui/Input.tsx';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { useCreateUserMutation } from '@/app/store/features/users.api.ts';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [createNewUser] = useCreateUserMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterCredentials>({
    resolver: zodResolver(RegisterValidator),
  });
  const onSubmit: SubmitHandler<RegisterCredentials> = (data) => {
    createNewUser(data)
      .unwrap()
      .then(() => {
        toast.success("You're successfully registered! Try to LogIn");
        reset();
      })
      .catch((error) => toast.error(error.data.error));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 items-center mt-4"
    >
      <Input
        register={register}
        placeholder="Email"
        error={errors.email?.message}
        name="email"
      />
      <Input
        register={register}
        placeholder="Password"
        error={errors.password?.message}
        name="password"
      />
      <Input
        register={register}
        placeholder="Name"
        error={errors.name?.message}
        name="name"
      />
      <Input
        register={register}
        placeholder="Extra details"
        error={errors.extra_details?.message}
        name="extra_details"
      />
      <Input
        register={register}
        placeholder="Skills"
        error={errors.skills?.message}
        name="skills"
      />
      <Input
        register={register}
        placeholder="Profession"
        error={errors.profession?.message}
        name="profession"
      />
      <Input
        register={register}
        placeholder="Details"
        error={errors.details?.message}
        name="details"
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

export default RegisterPage;
