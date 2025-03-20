package domain

import "time"

type ReservationCreated struct {
	ReservationID string
	CustomerName  string
	TableID       string
	DateTime      time.Time
	OccurredAt    time.Time
}

func NewReservationCreated(reservation *Reservation) ReservationCreated {
	return ReservationCreated{
		ReservationID: reservation.ID,
		CustomerName:  reservation.CustomerName,
		TableID:       reservation.TableID,
		DateTime:      reservation.DateTime,
		OccurredAt:    time.Now(),
	}
}

type ReservationCanceled struct {
	ReservationID string
	TableID       string
	OccurredAt    time.Time
}

func NewReservationCanceled(reservation *Reservation) ReservationCanceled {
	return ReservationCanceled{
		ReservationID: reservation.ID,
		TableID:       reservation.TableID,
		OccurredAt:    time.Now(),
	}
}
