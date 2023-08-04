import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface ILogOutButton {
  handleLogOut: () => void;
}

const LogOutButton = ({ handleLogOut }: ILogOutButton) => {
  return (
    <motion.button
      onClick={handleLogOut}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="text-main-error"
    >
      LogOut
      <div className={clsx('h-1', 'bg-transparent')} />
    </motion.button>
  );
};

export default LogOutButton;
