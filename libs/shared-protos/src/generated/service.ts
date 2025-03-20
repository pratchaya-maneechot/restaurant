import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type {
  OrderServiceClient as _order_OrderServiceClient,
  OrderServiceDefinition as _order_OrderServiceDefinition,
} from './order/OrderService';
import type {
  UserServiceClient as _user_UserServiceClient,
  UserServiceDefinition as _user_UserServiceDefinition,
} from './user/UserService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new (...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  order: {
    GetUserQueryRequest: MessageTypeDefinition;
    GetUserQueryResponse: MessageTypeDefinition;
    OrderService: SubtypeConstructor<typeof grpc.Client, _order_OrderServiceClient> & {
      service: _order_OrderServiceDefinition;
    };
  };
  user: {
    DeleteUserRequest: MessageTypeDefinition;
    DeleteUserResponse: MessageTypeDefinition;
    RegisterUserRequest: MessageTypeDefinition;
    RegisterUserResponse: MessageTypeDefinition;
    UpdateUserRequest: MessageTypeDefinition;
    UpdateUserResponse: MessageTypeDefinition;
    UserService: SubtypeConstructor<typeof grpc.Client, _user_UserServiceClient> & {
      service: _user_UserServiceDefinition;
    };
  };
}
