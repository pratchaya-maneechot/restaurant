import * as grpc from '@grpc/grpc-js';
import { PROTOS } from '@restaurant/shared-proto-ts';
import { envConfig } from '../config/env';

const env = envConfig();

export const grpcClient = new PROTOS.user.UserService(env.USER_SERVICE_ENDPOINT, grpc.credentials.createInsecure());
