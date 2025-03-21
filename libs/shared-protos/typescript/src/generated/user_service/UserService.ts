// Original file: /Users/peeter/Desktop/Top/restaurant/libs/shared-protos/_proto/user_service/service.proto

import type * as grpc from '@grpc/grpc-js';
import type { MethodDefinition } from '@grpc/proto-loader';
import type {
  DeleteUserRequest as _user_service_DeleteUserRequest,
  DeleteUserRequest__Output as _user_service_DeleteUserRequest__Output,
} from '../user_service/DeleteUserRequest';
import type {
  DeleteUserResponse as _user_service_DeleteUserResponse,
  DeleteUserResponse__Output as _user_service_DeleteUserResponse__Output,
} from '../user_service/DeleteUserResponse';
import type {
  RegisterUserRequest as _user_service_RegisterUserRequest,
  RegisterUserRequest__Output as _user_service_RegisterUserRequest__Output,
} from '../user_service/RegisterUserRequest';
import type {
  RegisterUserResponse as _user_service_RegisterUserResponse,
  RegisterUserResponse__Output as _user_service_RegisterUserResponse__Output,
} from '../user_service/RegisterUserResponse';
import type {
  UpdateUserRequest as _user_service_UpdateUserRequest,
  UpdateUserRequest__Output as _user_service_UpdateUserRequest__Output,
} from '../user_service/UpdateUserRequest';
import type {
  UpdateUserResponse as _user_service_UpdateUserResponse,
  UpdateUserResponse__Output as _user_service_UpdateUserResponse__Output,
} from '../user_service/UpdateUserResponse';

export interface UserServiceClient extends grpc.Client {
  DeleteUser(
    argument: _user_service_DeleteUserRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_user_service_DeleteUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  DeleteUser(
    argument: _user_service_DeleteUserRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_user_service_DeleteUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  DeleteUser(
    argument: _user_service_DeleteUserRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_user_service_DeleteUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  DeleteUser(
    argument: _user_service_DeleteUserRequest,
    callback: grpc.requestCallback<_user_service_DeleteUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  deleteUser(
    argument: _user_service_DeleteUserRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_user_service_DeleteUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  deleteUser(
    argument: _user_service_DeleteUserRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_user_service_DeleteUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  deleteUser(
    argument: _user_service_DeleteUserRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_user_service_DeleteUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  deleteUser(
    argument: _user_service_DeleteUserRequest,
    callback: grpc.requestCallback<_user_service_DeleteUserResponse__Output>,
  ): grpc.ClientUnaryCall;

  RegisterUser(
    argument: _user_service_RegisterUserRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_user_service_RegisterUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  RegisterUser(
    argument: _user_service_RegisterUserRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_user_service_RegisterUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  RegisterUser(
    argument: _user_service_RegisterUserRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_user_service_RegisterUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  RegisterUser(
    argument: _user_service_RegisterUserRequest,
    callback: grpc.requestCallback<_user_service_RegisterUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  registerUser(
    argument: _user_service_RegisterUserRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_user_service_RegisterUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  registerUser(
    argument: _user_service_RegisterUserRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_user_service_RegisterUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  registerUser(
    argument: _user_service_RegisterUserRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_user_service_RegisterUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  registerUser(
    argument: _user_service_RegisterUserRequest,
    callback: grpc.requestCallback<_user_service_RegisterUserResponse__Output>,
  ): grpc.ClientUnaryCall;

  UpdateUser(
    argument: _user_service_UpdateUserRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_user_service_UpdateUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  UpdateUser(
    argument: _user_service_UpdateUserRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_user_service_UpdateUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  UpdateUser(
    argument: _user_service_UpdateUserRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_user_service_UpdateUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  UpdateUser(
    argument: _user_service_UpdateUserRequest,
    callback: grpc.requestCallback<_user_service_UpdateUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  updateUser(
    argument: _user_service_UpdateUserRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_user_service_UpdateUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  updateUser(
    argument: _user_service_UpdateUserRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_user_service_UpdateUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  updateUser(
    argument: _user_service_UpdateUserRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_user_service_UpdateUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  updateUser(
    argument: _user_service_UpdateUserRequest,
    callback: grpc.requestCallback<_user_service_UpdateUserResponse__Output>,
  ): grpc.ClientUnaryCall;
}

export interface UserServiceHandlers extends grpc.UntypedServiceImplementation {
  DeleteUser: grpc.handleUnaryCall<_user_service_DeleteUserRequest__Output, _user_service_DeleteUserResponse>;

  RegisterUser: grpc.handleUnaryCall<_user_service_RegisterUserRequest__Output, _user_service_RegisterUserResponse>;

  UpdateUser: grpc.handleUnaryCall<_user_service_UpdateUserRequest__Output, _user_service_UpdateUserResponse>;
}

export interface UserServiceDefinition extends grpc.ServiceDefinition {
  DeleteUser: MethodDefinition<
    _user_service_DeleteUserRequest,
    _user_service_DeleteUserResponse,
    _user_service_DeleteUserRequest__Output,
    _user_service_DeleteUserResponse__Output
  >;
  RegisterUser: MethodDefinition<
    _user_service_RegisterUserRequest,
    _user_service_RegisterUserResponse,
    _user_service_RegisterUserRequest__Output,
    _user_service_RegisterUserResponse__Output
  >;
  UpdateUser: MethodDefinition<
    _user_service_UpdateUserRequest,
    _user_service_UpdateUserResponse,
    _user_service_UpdateUserRequest__Output,
    _user_service_UpdateUserResponse__Output
  >;
}
