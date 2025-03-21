package definition

type CancelReservationCommand struct {
	ReservationID string
}

func (c CancelReservationCommand) Type() string {
	return "CancelReservation"
}
