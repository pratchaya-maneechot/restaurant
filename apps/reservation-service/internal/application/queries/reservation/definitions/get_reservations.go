package definition

type GetReservationsQuery struct{}

func (q GetReservationsQuery) Type() string {
	return "GetReservations"
}
