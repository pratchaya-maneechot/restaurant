import { AuthProvider, IAuthProvider } from '@restaurant/core-domain';
import { logger } from '@restaurant/shared-utils';
import express from 'express';
import { grpcClient as reservationGrpcClient } from '../services/reservation.service';
import { grpcClient as userGrpcClient } from '../services/user.service';
import { IAppContext, IAuthentication } from './types';

export async function createContext(req: express.Request): Promise<IAppContext> {
  const identity: IAuthentication = {
    id: '',
  };
  try {
    const idToken = req.headers.authorization?.replace('Bearer ', '');
    if (idToken) {
      const authService: IAuthProvider = new AuthProvider();
      const verified = await authService.verifyToken<IAuthentication>(idToken);
      identity.id = verified.id;
    }
  } catch (error) {
    logger.error(error, req.headers);
  }
  return {
    identity,
    service: {
      user: userGrpcClient,
      reservation: reservationGrpcClient,
    },
  };
}
