import * as grpc from '@grpc/grpc-js';
import { Metadata } from '@grpc/grpc-js';
import { PROTOS } from '@restaurant/shared-proto-ts';
import { envConfig } from '../config/env';
import { promisifyGrpcService } from '../utils/promisifyGrpc';

const env = envConfig();
const grpcClient = new PROTOS.user.UserService(env.USER_SERVICE_ENDPOINT, grpc.credentials.createInsecure());
export const userService = (option?: { metadata?: Metadata }) => promisifyGrpcService(grpcClient, option?.metadata);
export type IUserServiceClient = ReturnType<typeof userService>;
