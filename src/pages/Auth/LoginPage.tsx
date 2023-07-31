import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { useLoginMutation } from '@/app/store/features/api.ts';
import toast from 'react-hot-toast';
import {
  LoginCredentials,
  LoginValidator,
} from '@/app/features/loginScheme.ts';
import Input from '@/components/ui/Input.tsx';

const LoginPage = () => {
  const [loginMutation] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({ resolver: zodResolver(LoginValidator) });

  const onSubmit: SubmitHandler<LoginCredentials> = (data) => {
    loginMutation(data)
      .unwrap()
      .then((response) => {
        console.log(response.token);
        toast.success('Welcome to User-Blog TS');
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

export default LoginPage;
