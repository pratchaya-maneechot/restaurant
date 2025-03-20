import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { join } from 'path';
import { ProtoGrpcType } from '../generated';

const PROTO_PATH = join(__dirname, '..', 'protos', 'user_service', 'service.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
export const proto = grpc.loadPackageDefinition(packageDefinition) as unknown as Pick<ProtoGrpcType, 'user'>;
