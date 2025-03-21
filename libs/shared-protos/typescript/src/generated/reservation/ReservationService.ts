// Original file: /Users/peeter/Desktop/Top/restaurant/libs/shared-protos/_proto/reservation_service/service.proto

import type * as grpc from '@grpc/grpc-js';
import type { MethodDefinition } from '@grpc/proto-loader';
import type {
  CreateReservationRequest as _reservation_CreateReservationRequest,
  CreateReservationRequest__Output as _reservation_CreateReservationRequest__Output,
} from '../reservation/CreateReservationRequest';
import type {
  CreateReservationResponse as _reservation_CreateReservationResponse,
  CreateReservationResponse__Output as _reservation_CreateReservationResponse__Output,
} from '../reservation/CreateReservationResponse';
import type {
  GetReservationRequest as _reservation_GetReservationRequest,
  GetReservationRequest__Output as _reservation_GetReservationRequest__Output,
} from '../reservation/GetReservationRequest';
import type {
  GetReservationResponse as _reservation_GetReservationResponse,
  GetReservationResponse__Output as _reservation_GetReservationResponse__Output,
} from '../reservation/GetReservationResponse';

export interface ReservationServiceClient extends grpc.Client {
  CreateReservation(
    argument: _reservation_CreateReservationRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_reservation_CreateReservationResponse__Output>,
  ): grpc.ClientUnaryCall;
  CreateReservation(
    argument: _reservation_CreateReservationRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_reservation_CreateReservationResponse__Output>,
  ): grpc.ClientUnaryCall;
  CreateReservation(
    argument: _reservation_CreateReservationRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_reservation_CreateReservationResponse__Output>,
  ): grpc.ClientUnaryCall;
  CreateReservation(
    argument: _reservation_CreateReservationRequest,
    callback: grpc.requestCallback<_reservation_CreateReservationResponse__Output>,
  ): grpc.ClientUnaryCall;
  createReservation(
    argument: _reservation_CreateReservationRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_reservation_CreateReservationResponse__Output>,
  ): grpc.ClientUnaryCall;
  createReservation(
    argument: _reservation_CreateReservationRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_reservation_CreateReservationResponse__Output>,
  ): grpc.ClientUnaryCall;
  createReservation(
    argument: _reservation_CreateReservationRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_reservation_CreateReservationResponse__Output>,
  ): grpc.ClientUnaryCall;
  createReservation(
    argument: _reservation_CreateReservationRequest,
    callback: grpc.requestCallback<_reservation_CreateReservationResponse__Output>,
  ): grpc.ClientUnaryCall;

  GetReservation(
    argument: _reservation_GetReservationRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_reservation_GetReservationResponse__Output>,
  ): grpc.ClientUnaryCall;
  GetReservation(
    argument: _reservation_GetReservationRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_reservation_GetReservationResponse__Output>,
  ): grpc.ClientUnaryCall;
  GetReservation(
    argument: _reservation_GetReservationRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_reservation_GetReservationResponse__Output>,
  ): grpc.ClientUnaryCall;
  GetReservation(
    argument: _reservation_GetReservationRequest,
    callback: grpc.requestCallback<_reservation_GetReservationResponse__Output>,
  ): grpc.ClientUnaryCall;
  getReservation(
    argument: _reservation_GetReservationRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_reservation_GetReservationResponse__Output>,
  ): grpc.ClientUnaryCall;
  getReservation(
    argument: _reservation_GetReservationRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_reservation_GetReservationResponse__Output>,
  ): grpc.ClientUnaryCall;
  getReservation(
    argument: _reservation_GetReservationRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_reservation_GetReservationResponse__Output>,
  ): grpc.ClientUnaryCall;
  getReservation(
    argument: _reservation_GetReservationRequest,
    callback: grpc.requestCallback<_reservation_GetReservationResponse__Output>,
  ): grpc.ClientUnaryCall;
}

export interface ReservationServiceHandlers extends grpc.UntypedServiceImplementation {
  CreateReservation: grpc.handleUnaryCall<
    _reservation_CreateReservationRequest__Output,
    _reservation_CreateReservationResponse
  >;

  GetReservation: grpc.handleUnaryCall<_reservation_GetReservationRequest__Output, _reservation_GetReservationResponse>;
}

export interface ReservationServiceDefinition extends grpc.ServiceDefinition {
  CreateReservation: MethodDefinition<
    _reservation_CreateReservationRequest,
    _reservation_CreateReservationResponse,
    _reservation_CreateReservationRequest__Output,
    _reservation_CreateReservationResponse__Output
  >;
  GetReservation: MethodDefinition<
    _reservation_GetReservationRequest,
    _reservation_GetReservationResponse,
    _reservation_GetReservationRequest__Output,
    _reservation_GetReservationResponse__Output
  >;
}
