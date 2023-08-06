import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { ChangeEvent } from 'react';

interface IUploadImageProps {
  isShownImageUpload: boolean;
  handleImageSelect: (event: ChangeEvent<HTMLInputElement>) => void;
  handleImageUpload: () => void;
}

const ImageUpload = ({
  isShownImageUpload,
  handleImageUpload,
  handleImageSelect,
}: IUploadImageProps) => {
  return (
    <div
      className={clsx(
        !isShownImageUpload && 'hidden',
        'flex flex-col items-center bg-secondary-light-blue rounded',
      )}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        className={clsx(
          'text-sm mt-2',
          'file:py-2 file:px-6',
          'file:bg-main-light-blue file:text-highlight',
          'file:rounded-full file:border-0',
          'hover:file:cursor-pointer hover:file:bg-secondary-dark-blue',
        )}
      />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleImageUpload}
        className={clsx(
          'bg-main-light-blue text-base',
          'cursor-pointer',
          'px-2 py-1 rounded-lg mt-4 mb-2',
          'hover:bg-secondary-dark-blue hover:border',
        )}
      >
        Upload
      </motion.button>
    </div>
  );
};

export default ImageUpload;
