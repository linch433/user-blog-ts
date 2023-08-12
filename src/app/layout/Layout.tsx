import { ReactNode } from 'react';
import Header from '@/app/layout/Header.tsx';
import { clsx } from 'clsx';
import Divider from '@/components/ui/Divider.tsx';

interface ILayout {
  children: ReactNode;
}

const Layout = ({ children }: ILayout) => {
  return (
    <div className="font-poppins text-highlight bg-main-dark-blue">
      <Header />
      <Divider />
      <section
        className={clsx(
          'min-h-[calc(100vh-5.1rem)]',
          'text-lg',
          'flex justify-center',
        )}
      >
        <div className="px-8 max-w-3xl mx-auto">{children}</div>
      </section>
    </div>
  );
};

export default Layout;
