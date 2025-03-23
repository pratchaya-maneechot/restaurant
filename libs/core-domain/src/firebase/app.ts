import { getApps, initializeApp } from 'firebase-admin/app';

export const getFirebaseApp = () => {
  const apps = getApps();
  return apps.find((a) => a.name === 'restaurant') || initializeApp({}, 'restaurant');
};
