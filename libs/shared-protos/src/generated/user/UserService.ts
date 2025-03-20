// Original file: /Users/peeter/Desktop/Top/restaurant/libs/shared-protos/src/protos/user_service/service.proto

import type * as grpc from '@grpc/grpc-js';
import type { MethodDefinition } from '@grpc/proto-loader';
import type {
  DeleteUserRequest as _user_DeleteUserRequest,
  DeleteUserRequest__Output as _user_DeleteUserRequest__Output,
} from '../user/DeleteUserRequest';
import type {
  DeleteUserResponse as _user_DeleteUserResponse,
  DeleteUserResponse__Output as _user_DeleteUserResponse__Output,
} from '../user/DeleteUserResponse';
import type {
  RegisterUserRequest as _user_RegisterUserRequest,
  RegisterUserRequest__Output as _user_RegisterUserRequest__Output,
} from '../user/RegisterUserRequest';
import type {
  RegisterUserResponse as _user_RegisterUserResponse,
  RegisterUserResponse__Output as _user_RegisterUserResponse__Output,
} from '../user/RegisterUserResponse';
import type {
  UpdateUserRequest as _user_UpdateUserRequest,
  UpdateUserRequest__Output as _user_UpdateUserRequest__Output,
} from '../user/UpdateUserRequest';
import type {
  UpdateUserResponse as _user_UpdateUserResponse,
  UpdateUserResponse__Output as _user_UpdateUserResponse__Output,
} from '../user/UpdateUserResponse';

export interface UserServiceClient extends grpc.Client {
  DeleteUser(
    argument: _user_DeleteUserRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_user_DeleteUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  DeleteUser(
    argument: _user_DeleteUserRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_user_DeleteUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  DeleteUser(
    argument: _user_DeleteUserRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_user_DeleteUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  DeleteUser(
    argument: _user_DeleteUserRequest,
    callback: grpc.requestCallback<_user_DeleteUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  deleteUser(
    argument: _user_DeleteUserRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_user_DeleteUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  deleteUser(
    argument: _user_DeleteUserRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_user_DeleteUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  deleteUser(
    argument: _user_DeleteUserRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_user_DeleteUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  deleteUser(
    argument: _user_DeleteUserRequest,
    callback: grpc.requestCallback<_user_DeleteUserResponse__Output>,
  ): grpc.ClientUnaryCall;

  RegisterUser(
    argument: _user_RegisterUserRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_user_RegisterUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  RegisterUser(
    argument: _user_RegisterUserRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_user_RegisterUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  RegisterUser(
    argument: _user_RegisterUserRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_user_RegisterUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  RegisterUser(
    argument: _user_RegisterUserRequest,
    callback: grpc.requestCallback<_user_RegisterUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  registerUser(
    argument: _user_RegisterUserRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_user_RegisterUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  registerUser(
    argument: _user_RegisterUserRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_user_RegisterUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  registerUser(
    argument: _user_RegisterUserRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_user_RegisterUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  registerUser(
    argument: _user_RegisterUserRequest,
    callback: grpc.requestCallback<_user_RegisterUserResponse__Output>,
  ): grpc.ClientUnaryCall;

  UpdateUser(
    argument: _user_UpdateUserRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_user_UpdateUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  UpdateUser(
    argument: _user_UpdateUserRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_user_UpdateUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  UpdateUser(
    argument: _user_UpdateUserRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_user_UpdateUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  UpdateUser(
    argument: _user_UpdateUserRequest,
    callback: grpc.requestCallback<_user_UpdateUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  updateUser(
    argument: _user_UpdateUserRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_user_UpdateUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  updateUser(
    argument: _user_UpdateUserRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_user_UpdateUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  updateUser(
    argument: _user_UpdateUserRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_user_UpdateUserResponse__Output>,
  ): grpc.ClientUnaryCall;
  updateUser(
    argument: _user_UpdateUserRequest,
    callback: grpc.requestCallback<_user_UpdateUserResponse__Output>,
  ): grpc.ClientUnaryCall;
}

export interface UserServiceHandlers extends grpc.UntypedServiceImplementation {
  DeleteUser: grpc.handleUnaryCall<_user_DeleteUserRequest__Output, _user_DeleteUserResponse>;

  RegisterUser: grpc.handleUnaryCall<_user_RegisterUserRequest__Output, _user_RegisterUserResponse>;

  UpdateUser: grpc.handleUnaryCall<_user_UpdateUserRequest__Output, _user_UpdateUserResponse>;
}

export interface UserServiceDefinition extends grpc.ServiceDefinition {
  DeleteUser: MethodDefinition<
    _user_DeleteUserRequest,
    _user_DeleteUserResponse,
    _user_DeleteUserRequest__Output,
    _user_DeleteUserResponse__Output
  >;
  RegisterUser: MethodDefinition<
    _user_RegisterUserRequest,
    _user_RegisterUserResponse,
    _user_RegisterUserRequest__Output,
    _user_RegisterUserResponse__Output
  >;
  UpdateUser: MethodDefinition<
    _user_UpdateUserRequest,
    _user_UpdateUserResponse,
    _user_UpdateUserRequest__Output,
    _user_UpdateUserResponse__Output
  >;
}
