// Original file: /Users/peeter/Desktop/Top/restaurant/libs/shared-protos/_proto/reservation_service/service.proto

import type * as grpc from '@grpc/grpc-js';
import type { MethodDefinition } from '@grpc/proto-loader';
import type {
  CreateReservationRequest as _reservation_service_CreateReservationRequest,
  CreateReservationRequest__Output as _reservation_service_CreateReservationRequest__Output,
} from '../reservation_service/CreateReservationRequest';
import type {
  CreateReservationResponse as _reservation_service_CreateReservationResponse,
  CreateReservationResponse__Output as _reservation_service_CreateReservationResponse__Output,
} from '../reservation_service/CreateReservationResponse';
import type {
  GetReservationRequest as _reservation_service_GetReservationRequest,
  GetReservationRequest__Output as _reservation_service_GetReservationRequest__Output,
} from '../reservation_service/GetReservationRequest';
import type {
  GetReservationResponse as _reservation_service_GetReservationResponse,
  GetReservationResponse__Output as _reservation_service_GetReservationResponse__Output,
} from '../reservation_service/GetReservationResponse';

export interface ReservationServiceClient extends grpc.Client {
  CreateReservation(
    argument: _reservation_service_CreateReservationRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_reservation_service_CreateReservationResponse__Output>,
  ): grpc.ClientUnaryCall;
  CreateReservation(
    argument: _reservation_service_CreateReservationRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_reservation_service_CreateReservationResponse__Output>,
  ): grpc.ClientUnaryCall;
  CreateReservation(
    argument: _reservation_service_CreateReservationRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_reservation_service_CreateReservationResponse__Output>,
  ): grpc.ClientUnaryCall;
  CreateReservation(
    argument: _reservation_service_CreateReservationRequest,
    callback: grpc.requestCallback<_reservation_service_CreateReservationResponse__Output>,
  ): grpc.ClientUnaryCall;
  createReservation(
    argument: _reservation_service_CreateReservationRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_reservation_service_CreateReservationResponse__Output>,
  ): grpc.ClientUnaryCall;
  createReservation(
    argument: _reservation_service_CreateReservationRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_reservation_service_CreateReservationResponse__Output>,
  ): grpc.ClientUnaryCall;
  createReservation(
    argument: _reservation_service_CreateReservationRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_reservation_service_CreateReservationResponse__Output>,
  ): grpc.ClientUnaryCall;
  createReservation(
    argument: _reservation_service_CreateReservationRequest,
    callback: grpc.requestCallback<_reservation_service_CreateReservationResponse__Output>,
  ): grpc.ClientUnaryCall;

  GetReservation(
    argument: _reservation_service_GetReservationRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_reservation_service_GetReservationResponse__Output>,
  ): grpc.ClientUnaryCall;
  GetReservation(
    argument: _reservation_service_GetReservationRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_reservation_service_GetReservationResponse__Output>,
  ): grpc.ClientUnaryCall;
  GetReservation(
    argument: _reservation_service_GetReservationRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_reservation_service_GetReservationResponse__Output>,
  ): grpc.ClientUnaryCall;
  GetReservation(
    argument: _reservation_service_GetReservationRequest,
    callback: grpc.requestCallback<_reservation_service_GetReservationResponse__Output>,
  ): grpc.ClientUnaryCall;
  getReservation(
    argument: _reservation_service_GetReservationRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_reservation_service_GetReservationResponse__Output>,
  ): grpc.ClientUnaryCall;
  getReservation(
    argument: _reservation_service_GetReservationRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_reservation_service_GetReservationResponse__Output>,
  ): grpc.ClientUnaryCall;
  getReservation(
    argument: _reservation_service_GetReservationRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_reservation_service_GetReservationResponse__Output>,
  ): grpc.ClientUnaryCall;
  getReservation(
    argument: _reservation_service_GetReservationRequest,
    callback: grpc.requestCallback<_reservation_service_GetReservationResponse__Output>,
  ): grpc.ClientUnaryCall;
}

export interface ReservationServiceHandlers extends grpc.UntypedServiceImplementation {
  CreateReservation: grpc.handleUnaryCall<
    _reservation_service_CreateReservationRequest__Output,
    _reservation_service_CreateReservationResponse
  >;

  GetReservation: grpc.handleUnaryCall<
    _reservation_service_GetReservationRequest__Output,
    _reservation_service_GetReservationResponse
  >;
}

export interface ReservationServiceDefinition extends grpc.ServiceDefinition {
  CreateReservation: MethodDefinition<
    _reservation_service_CreateReservationRequest,
    _reservation_service_CreateReservationResponse,
    _reservation_service_CreateReservationRequest__Output,
    _reservation_service_CreateReservationResponse__Output
  >;
  GetReservation: MethodDefinition<
    _reservation_service_GetReservationRequest,
    _reservation_service_GetReservationResponse,
    _reservation_service_GetReservationRequest__Output,
    _reservation_service_GetReservationResponse__Output
  >;
}
