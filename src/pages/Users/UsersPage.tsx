import { useState } from 'react';
import { useGetUsersQuery } from '@/app/store/features/users.api.ts';
import { IGeneralQuery } from '@/types/models.ts';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import UserCard from '@/components/ui/User/UserCard.tsx';
import { PageLoader } from '@/components/ui/Loader/Loader.tsx';

const UsersPage = () => {
  const [countItems, setCountItems] = useState(20);
  const params: IGeneralQuery = {
    limit: countItems,
  };

  const { data: users, isLoading, isError } = useGetUsersQuery(params);

  if (isLoading) return <PageLoader />;
  if (isError) return <div>Something went wrong</div>;

  const handleCountUpdate = () => {
    setCountItems((prevState) => prevState + 20);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={clsx(
          'mt-4',
          'grid grid-cols-1',
          'md:grid-cols-3 md:space-y-0',
          'sm:grid-cols-2 gap-4',
        )}
      >
        {users?.map((user) => <UserCard key={user._id} user={user} />)}
      </motion.div>
      <div className="flex items-center justify-center my-4">
        <button
          onClick={handleCountUpdate}
          className={clsx(
            'bg-main-light-blue',
            'cursor-pointer',
            'px-2 py-1 rounded-lg',
            'hover:bg-secondary-dark-blue hover:border',
          )}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default UsersPage;
