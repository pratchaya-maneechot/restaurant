import { AuthProvider, IAuthProvider } from '@restaurant/core-domain';
import { IExpressRequest } from '@restaurant/shared-utils';
import _ from 'lodash';
import { reservationService } from '../services/reservation.service';
import { userService } from '../services/user.service';
import { IAppContext, IAuthentication } from './types';

export async function createContext(req: IExpressRequest): Promise<IAppContext> {
  const identity: IAuthentication = {
    id: '',
  };
  try {
    const idToken = req.headers.authorization?.replace('Bearer ', '');
    if (idToken) {
      const authService: IAuthProvider = new AuthProvider();
      const verified = await authService.verifyToken<IAuthentication>(idToken);
      identity.id = verified.id;
      req.metadata?.set('user', JSON.stringify(_.pick(identity, 'name', 'email', 'phone', 'role')));
    }
  } catch (error) {
    req.logger?.error(error.message, error);
  }
  return {
    logger: req.logger,
    identity,
    service: {
      user: userService({ metadata: req.metadata }),
      reservation: reservationService({ metadata: req.metadata }),
    },
  };
}
