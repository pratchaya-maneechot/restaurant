import { Auth, DecodedIdToken } from 'firebase-admin/auth';
import { injectable } from 'inversify';
import { getFirebaseAuth } from '../firebase/auth';
import { IAuthProvider } from './interfaces/IAuthProvider';

@injectable()
export class AuthProvider implements IAuthProvider {
  private auth: Auth;
  constructor() {
    this.auth = getFirebaseAuth();
  }

  async revokeRefreshTokens(uid: string): Promise<void> {
    await this.auth.revokeRefreshTokens(uid);
  }

  async verifyToken<T extends object>(idToken: string) {
    const result = await this.auth.verifyIdToken(idToken, true);
    return result as DecodedIdToken & T;
  }

  async createToken<T extends object>(id: string, payload: T): Promise<string> {
    const result = await this.auth.createCustomToken(id, payload);
    return result;
  }
}
