import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type {
  ReservationServiceClient as _reservation_ReservationServiceClient,
  ReservationServiceDefinition as _reservation_ReservationServiceDefinition,
} from './reservation/ReservationService';
import type {
  UserServiceClient as _user_UserServiceClient,
  UserServiceDefinition as _user_UserServiceDefinition,
} from './user/UserService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new (...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  reservation: {
    CreateReservationRequest: MessageTypeDefinition;
    CreateReservationResponse: MessageTypeDefinition;
    GetReservationRequest: MessageTypeDefinition;
    GetReservationResponse: MessageTypeDefinition;
    ReservationService: SubtypeConstructor<typeof grpc.Client, _reservation_ReservationServiceClient> & {
      service: _reservation_ReservationServiceDefinition;
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
