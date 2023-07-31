import NavigationLink from '@/components/ui/NavLink.tsx';
import { clsx } from 'clsx';

const Header = () => {
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
      <NavigationLink path="auth" navigationName="Auth" />
    </div>
  );
};

export default Header;
