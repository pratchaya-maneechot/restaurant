// Original file: /Users/peeter/Desktop/Top/restaurant/libs/shared-protos/_proto/reservation_service/service.proto

export interface CreateReservationRequest {
  reservationId?: string;
  customerName?: string;
  tableId?: string;
  dateTime?: string;
}

export interface CreateReservationRequest__Output {
  reservationId: string;
  customerName: string;
  tableId: string;
  dateTime: string;
}
