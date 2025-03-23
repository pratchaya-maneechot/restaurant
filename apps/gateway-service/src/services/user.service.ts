import * as grpc from '@grpc/grpc-js';
import { PROTOS } from '@restaurant/shared-proto-ts';
import { envConfig } from '../config/env';
import { promisifyGrpcService } from '../utils/promisifyGrpc';

const env = envConfig();
const grpcClient = new PROTOS.user.UserService(env.USER_SERVICE_ENDPOINT, grpc.credentials.createInsecure());
export const service = promisifyGrpcService(grpcClient);
export type IUserServiceClient = typeof service;
