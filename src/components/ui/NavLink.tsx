import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface INavLink {
  path: string;
  navigationName: string;
}

const NavigationLink = ({ navigationName, path }: INavLink) => {
  return (
    <NavLink to={path}>
      {({ isActive }) => (
        <>
          {navigationName}
          {isActive ? (
            <motion.div
              className={clsx('h-1', 'bg-highlight', 'rounded-full')}
              layoutId="underline"
            />
          ) : null}
        </>
      )}
    </NavLink>
  );
};

export default NavigationLink;
