// Original file: /Users/peeter/Desktop/Top/restaurant/libs/shared-protos/src/protos/order_service/service.proto

import type * as grpc from '@grpc/grpc-js';
import type { MethodDefinition } from '@grpc/proto-loader';
import type {
  GetUserQueryRequest as _order_GetUserQueryRequest,
  GetUserQueryRequest__Output as _order_GetUserQueryRequest__Output,
} from '../order/GetUserQueryRequest';
import type {
  GetUserQueryResponse as _order_GetUserQueryResponse,
  GetUserQueryResponse__Output as _order_GetUserQueryResponse__Output,
} from '../order/GetUserQueryResponse';

export interface OrderServiceClient extends grpc.Client {
  GetUserQuery(
    argument: _order_GetUserQueryRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_order_GetUserQueryResponse__Output>,
  ): grpc.ClientUnaryCall;
  GetUserQuery(
    argument: _order_GetUserQueryRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_order_GetUserQueryResponse__Output>,
  ): grpc.ClientUnaryCall;
  GetUserQuery(
    argument: _order_GetUserQueryRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_order_GetUserQueryResponse__Output>,
  ): grpc.ClientUnaryCall;
  GetUserQuery(
    argument: _order_GetUserQueryRequest,
    callback: grpc.requestCallback<_order_GetUserQueryResponse__Output>,
  ): grpc.ClientUnaryCall;
  getUserQuery(
    argument: _order_GetUserQueryRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_order_GetUserQueryResponse__Output>,
  ): grpc.ClientUnaryCall;
  getUserQuery(
    argument: _order_GetUserQueryRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_order_GetUserQueryResponse__Output>,
  ): grpc.ClientUnaryCall;
  getUserQuery(
    argument: _order_GetUserQueryRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_order_GetUserQueryResponse__Output>,
  ): grpc.ClientUnaryCall;
  getUserQuery(
    argument: _order_GetUserQueryRequest,
    callback: grpc.requestCallback<_order_GetUserQueryResponse__Output>,
  ): grpc.ClientUnaryCall;
}

export interface OrderServiceHandlers extends grpc.UntypedServiceImplementation {
  GetUserQuery: grpc.handleUnaryCall<_order_GetUserQueryRequest__Output, _order_GetUserQueryResponse>;
}

export interface OrderServiceDefinition extends grpc.ServiceDefinition {
  GetUserQuery: MethodDefinition<
    _order_GetUserQueryRequest,
    _order_GetUserQueryResponse,
    _order_GetUserQueryRequest__Output,
    _order_GetUserQueryResponse__Output
  >;
}
