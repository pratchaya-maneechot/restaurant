// Original file: /Users/peeter/Desktop/Top/restaurant/libs/shared-protos/_proto/reservation_service/service.proto

export interface GetReservationResponse {
  reservationId?: string;
  customerName?: string;
  tableId?: string;
  dateTime?: string;
  status?: string;
}

export interface GetReservationResponse__Output {
  reservationId: string;
  customerName: string;
  tableId: string;
  dateTime: string;
  status: string;
}
