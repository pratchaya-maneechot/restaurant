import * as grpc from '@grpc/grpc-js';
import { PROTOS, UserServiceHandlers } from '@restaurant/shared-proto-ts';
import { TYPES } from '../../config/types';
import { initializes } from '../../initialize';

(async () => {
  const container = await initializes();

  const server = new grpc.Server();

  server.addService(PROTOS.user.UserService.service, container.get<UserServiceHandlers>(TYPES.UserHandler));

  const PORT = '50051';

  server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error('Error binding server:', err);
      return;
    }
    console.log(`🚀 gRPC server running at http://localhost:${port}`);
  });
})();
