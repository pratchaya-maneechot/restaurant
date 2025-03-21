import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type {
  ReservationServiceClient as _reservation_service_ReservationServiceClient,
  ReservationServiceDefinition as _reservation_service_ReservationServiceDefinition,
} from './reservation_service/ReservationService';
import type {
  UserServiceClient as _user_service_UserServiceClient,
  UserServiceDefinition as _user_service_UserServiceDefinition,
} from './user_service/UserService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new (...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  reservation_service: {
    CreateReservationRequest: MessageTypeDefinition;
    CreateReservationResponse: MessageTypeDefinition;
    GetReservationRequest: MessageTypeDefinition;
    GetReservationResponse: MessageTypeDefinition;
    ReservationService: SubtypeConstructor<typeof grpc.Client, _reservation_service_ReservationServiceClient> & {
      service: _reservation_service_ReservationServiceDefinition;
    };
  };
  user_service: {
    DeleteUserRequest: MessageTypeDefinition;
    DeleteUserResponse: MessageTypeDefinition;
    RegisterUserRequest: MessageTypeDefinition;
    RegisterUserResponse: MessageTypeDefinition;
    UpdateUserRequest: MessageTypeDefinition;
    UpdateUserResponse: MessageTypeDefinition;
    UserService: SubtypeConstructor<typeof grpc.Client, _user_service_UserServiceClient> & {
      service: _user_service_UserServiceDefinition;
    };
  };
}
