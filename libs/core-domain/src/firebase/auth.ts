import { getAuth } from 'firebase-admin/auth';

import { getFirebaseApp } from './app';

export const getFirebaseAuth = () => {
  const app = getFirebaseApp();
  return getAuth(app);
};
