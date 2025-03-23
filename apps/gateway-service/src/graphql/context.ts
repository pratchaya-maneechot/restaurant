import express from 'express';
import { grpcClient as reservationGrpcClient } from '../services/reservation.service';
import { grpcClient as userGrpcClient } from '../services/user.service';
import { IAppContetxt } from './types';

export async function createContext(_req: express.Request): Promise<IAppContetxt> {
  return {
    identity: { id: '' },
    service: {
      user: userGrpcClient,
      reservation: reservationGrpcClient,
    },
  };
}
