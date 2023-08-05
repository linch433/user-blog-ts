import { ReactNode, useRef } from 'react';
import { useOutsideAlerter } from '@/components/ui/ModalWindow/hooks/useOutsideAlerter.ts';
import { clsx } from 'clsx';

interface IModalWindow {
  active: boolean;
  closeModal: () => void;
  children: ReactNode;
  width?: string;
  mobileWidth?: string;
  height?: string;
}

const ModalWindow = ({
  active,
  closeModal,
  height = 'h-3/4',
  children,
  mobileWidth = 'w-[95%]',
  width = 'md:w-3/4',
}: IModalWindow) => {
  const container = useRef(null);
  useOutsideAlerter({ ref: container, callback: () => closeModal() });

  return (
    <>
      {active && (
        <div
          className={clsx(
            'flex items-center justify-center',
            'fixed inset-0',
            'bg-black bg-opacity-60',
            'z-20',
          )}
        >
          <div
            ref={container}
            className={clsx(
              'bg-secondary-dark-blue',
              `${width} ${height}`,
              'rounded-xl shadow shadow-secondary-light-blue',
              mobileWidth,
            )}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default ModalWindow;
