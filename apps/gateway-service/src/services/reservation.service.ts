import * as grpc from '@grpc/grpc-js';
import { Metadata } from '@grpc/grpc-js';
import { PROTOS } from '@restaurant/shared-proto-ts';
import { envConfig } from '../config/env';
import { promisifyGrpcService } from '../utils/promisifyGrpc';

const env = envConfig();

export const grpcClient = new PROTOS.reservation.ReservationService(
  env.RESERVATION_SERVICE_ENDPOINT,
  grpc.credentials.createInsecure(),
);
export const reservationService = (option?: { metadata?: Metadata }) =>
  promisifyGrpcService(grpcClient, option?.metadata);
export type IReservationServiceClient = ReturnType<typeof reservationService>;
