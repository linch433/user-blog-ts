import { Key } from 'react';

type AuthTabs_T = {
  id: Key;
  name: string;
};

export const tabs: AuthTabs_T[] = [
  { id: '1', name: 'Login' },
  { id: '2', name: 'Register' },
];
