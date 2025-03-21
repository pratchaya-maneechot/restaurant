package definition

type GetReservationQuery struct {
	ReservationID string
}

func (q GetReservationQuery) Type() string {
	return "GetReservation"
}
