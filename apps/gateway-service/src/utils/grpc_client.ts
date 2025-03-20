import * as grpc from '@grpc/grpc-js';
import { ExampleServiceClient } from '../../libs/proto/src/lib/example';

const client = new ExampleServiceClient('localhost:50051', grpc.credentials.createInsecure());

const request = { name: 'Nx Monorepo' };
client.sayHello(request, (error, response) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log('Response:', response.message);
});
