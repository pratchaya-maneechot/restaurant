import { proto as reservationProto } from './reservation.service';
import { proto as userProto } from './user.service';

export const PROTOS = {
  user: userProto.user,
  reservation: reservationProto.reservation,
};
