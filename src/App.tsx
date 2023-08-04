import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store.ts';
import { decrement, increment } from '@/app/slices/counterSlice.ts';
import { clsx } from 'clsx';
import { useGetUsersQuery } from '@/app/features/api.ts';

const App = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  const params = {
    limit: 20,
  };

  const { data } = useGetUsersQuery(params);

  return (
    <div className={clsx('flex flex-col', 'items-center gap-3')}>
      <button
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <div>{count}</div>
      <button
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
      {data &&
        data.data.map((user: any) => <div key={user._id}>{user.email}</div>)}
    </div>
  );
};

export default App;
