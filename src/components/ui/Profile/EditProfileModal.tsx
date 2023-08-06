import ModalWindow from '@/components/ui/ModalWindow/ModalWindow.tsx';
import Input from '@/components/ui/Input.tsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserCreditionals, UserValidator } from '@/app/features/userScheme.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { User_T } from '@/types/models.ts';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { useUpdateUserByIdMutation } from '@/app/store/features/users.api.ts';
import toast from 'react-hot-toast';

interface IEditProfileModal {
  isModalActive: boolean;
  setIsModalActive: (args: boolean) => void;
  user: User_T | undefined;
}

const EditProfileModal = ({
  isModalActive,
  setIsModalActive,
  user,
}: IEditProfileModal) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserCreditionals>({
    resolver: zodResolver(UserValidator),
    defaultValues: {
      name: user?.name,
      profession: user?.profession,
      extra_details: user?.extra_details,
      details: user?.details,
      skills: user?.skills,
    },
  });
  const [updateUserById] = useUpdateUserByIdMutation();

  const onSubmit: SubmitHandler<UserCreditionals> = (data) => {
    updateUserById({ args: user?._id, body: data })
      .unwrap()
      .then(() => {
        toast.success('Your profile info edited successfully!');
        setIsModalActive(false);
      })
      .catch((error) => console.warn(error));
  };

  return (
    <ModalWindow
      active={isModalActive}
      closeModal={() => setIsModalActive(false)}
      height="h-3/5"
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
          name="name"
          register={register}
          placeholder="Name"
          error={errors.name?.message}
        />
        <Input
          name="extra_details"
          register={register}
          placeholder="Extra details"
          error={errors.extra_details?.message}
        />
        <Input
          name="skills"
          register={register}
          placeholder="Skills"
          error={errors.skills?.message}
        />
        <Input
          name="profession"
          register={register}
          placeholder="Profession"
          error={errors.profession?.message}
        />
        <Input
          name="details"
          register={register}
          placeholder="Details"
          error={errors.details?.message}
        />
        <motion.input
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          disabled={isSubmitting}
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

export default EditProfileModal;
