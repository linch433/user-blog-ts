import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginPage from '@/pages/Auth/LoginPage.tsx';
import RegisterPage from '@/pages/Auth/RegisterPage.tsx';
import { clsx } from 'clsx';
import { tabs } from '@/utils/AuthMockData.ts';

const AuthPage = () => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <div>
      <div className="flex flex-row gap-2 justify-center">
        {tabs.map((item) => (
          <div key={item.id} onClick={() => setSelectedTab(item)}>
            {item.name}
            {item === selectedTab ? (
              <motion.div
                className={clsx('h-1', 'bg-highlight', 'rounded-full')}
                layoutId="authUnderline"
              />
            ) : null}
          </div>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTab ? selectedTab.name : 'empty'}
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -10, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-60"
        >
          {selectedTab.name === 'Login' ? <LoginPage /> : <RegisterPage />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AuthPage;
