import NavigationLink from '@/components/ui/NavLink.tsx';
import { clsx } from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store/store.ts';
import { clearToken, saveToken } from '@/app/store/slices/counterSlice.ts';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogOutButton from '@/components/ui/LogOutButton.tsx';
import toast from 'react-hot-toast';

const Header = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem('AUTH_TOKEN');

    if (tokenFromLocalStorage) {
      dispatch(saveToken(tokenFromLocalStorage));
    }
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem('AUTH_TOKEN');
    dispatch(clearToken());
    navigate('/');
    toast("You're successfully log out!", {
      icon: '👋🏽',
    });
  };

  return (
    <div
      className={clsx(
        'flex flex-row justify-center',
        'gap-4 py-4',
        'bg-main-dark-blue text-lg text-white',
      )}
    >
      <NavigationLink path="/" navigationName="Home" />
      <NavigationLink path="users" navigationName="Users" />
      <NavigationLink path="posts" navigationName="Posts" />
      {token && <NavigationLink path="profile" navigationName="Profile" />}
      {token ? (
        <LogOutButton handleLogOut={handleLogOut} />
      ) : (
        <NavigationLink path="auth" navigationName="Auth" />
      )}
    </div>
  );
};

export default Header;
