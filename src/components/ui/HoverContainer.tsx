import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface IHoverContainer {
  children: ReactNode;
}

const HoverContainer = ({ children }: IHoverContainer) => {
  return (
    <motion.span
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="cursor-pointer"
    >
      {children}
    </motion.span>
  );
};

export default HoverContainer;
