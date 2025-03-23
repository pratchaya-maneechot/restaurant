import * as grpc from '@grpc/grpc-js';
import { PROTOS } from '@restaurant/shared-proto-ts';
import { envConfig } from '../config/env';
import { promisifyGrpcService } from '../utils/promisifyGrpc';

const env = envConfig();

export const grpcClient = new PROTOS.reservation.ReservationService(
  env.RESERVATION_SERVICE_ENDPOINT,
  grpc.credentials.createInsecure(),
);
export const service = promisifyGrpcService(grpcClient);
export type IReservationServiceClient = typeof service;
