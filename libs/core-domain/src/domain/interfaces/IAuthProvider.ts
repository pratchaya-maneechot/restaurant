import { DecodedIdToken } from 'firebase-admin/auth';

export interface IAuthProvider {
  createToken<T extends object>(id: string, payload: T): Promise<string>;
  verifyToken<T extends object>(idToken: string): Promise<DecodedIdToken & T>;
  revokeRefreshTokens(uid: string): Promise<void>;
}
