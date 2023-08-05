import { useEffect } from 'react';

interface IUseOutsideAlerterProps {
  ref: any;
  callback: () => void;
}

export const useOutsideAlerter = ({
  ref,
  callback,
}: IUseOutsideAlerterProps) => {
  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};
