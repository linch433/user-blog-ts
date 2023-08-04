import { useState } from 'react';
import { useGetUsersQuery } from '@/app/store/features/users.api.ts';
import { UserQuery_T } from '@/types/models.ts';
import { clsx } from 'clsx';
import UserCard from '@/components/ui/UserCard.tsx';

const UsersPage = () => {
  const [countItems, setCountItems] = useState(20);
  const params: UserQuery_T = {
    limit: countItems,
  };

  const { data: users, isLoading, isError } = useGetUsersQuery(params);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;

  const handleCountUpdate = () => {
    setCountItems((prevState) => prevState + 20);
  };

  return (
    <>
      <div
        className={clsx(
          'mt-4',
          'grid grid-cols-1',
          'md:grid-cols-3 md:space-y-0',
          'sm:grid-cols-2 gap-4',
        )}
      >
        {users?.map((user) => <UserCard key={user._id} user={user} />)}
      </div>
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
