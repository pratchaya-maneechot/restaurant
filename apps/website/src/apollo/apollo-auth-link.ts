import { setContext } from '@apollo/client/link/context';
import { AUTH_STORAGE_KEY } from '../auth/config';
import { getStorage } from '../hooks/use-local-storage';

export const authLink = setContext(async (_operation, { headers }) => {
  const idToken = getStorage(AUTH_STORAGE_KEY);
  if (idToken) {
    return {
      headers: {
        ...headers,
        Authorization: idToken,
      },
    };
  }
  return headers;
});
