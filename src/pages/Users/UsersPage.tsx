import { useState } from 'react';
import { useGetUsersQuery } from '@/app/store/features/users.api.ts';
import { IGeneralQuery, IUser } from '@/types/models.ts';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import UserCard from '@/components/ui/UserCard.tsx';
import { PageLoader } from '@/components/ui/Loader/Loader.tsx';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

const UsersPage = () => {
  const [skipItems, setSkipItems] = useState(0);
  const params: IGeneralQuery = {
    limit: 21,
    skip: skipItems * 21,
  };

  const {
    data: users,
    isLoading,
    isError,
    isFetching,
  } = useGetUsersQuery(params);

  if (isLoading) return <PageLoader />;
  if (isError) return <div>Something went wrong</div>;

  const totalPages = users && users?.pagination.total / 21;

  const handleCountNextUpdate = () => {
    setSkipItems((prevState) => prevState + 1);
  };

  const handleCountPreviousUpdate = () => {
    setSkipItems((prevState) => prevState - 1);
  };

  return (
    <>
      <div className="flex flex-row items-center justify-center mb-4 gap-2">
        <button
          onClick={handleCountPreviousUpdate}
          disabled={skipItems === 0}
          className={clsx(
            'bg-main-light-blue',
            'cursor-pointer',
            'px-2 py-1 rounded-lg',
            skipItems !== 0 && 'hover:bg-secondary-dark-blue hover:border',
            'disabled:bg-gray-600 disabled:border-0',
          )}
        >
          <AiOutlineArrowLeft size={30} />
        </button>
        <button
          onClick={handleCountNextUpdate}
          disabled={isFetching}
          className={clsx(
            'bg-main-light-blue',
            'cursor-pointer',
            'px-2 py-1 rounded-lg',
            'hover:bg-secondary-dark-blue hover:border',
            'disabled:bg-gray-600 disabled:border-0',
          )}
        >
          <AiOutlineArrowRight size={30} />
        </button>
        {`${skipItems + 1} / ${totalPages}`}
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={clsx(
          'my-4',
          'grid grid-cols-1',
          'md:grid-cols-3 md:space-y-0',
          'sm:grid-cols-2 gap-4',
        )}
      >
        {users?.data.map((user: IUser) => (
          <UserCard key={user._id} user={user} />
        ))}
      </motion.div>
    </>
  );
};

export default UsersPage;
