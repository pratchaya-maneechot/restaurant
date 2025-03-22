package domain

import (
	"errors"
	"time"

	"github.com/google/uuid"
)

type ReservationStatus string

const (
	StatusPending   ReservationStatus = "PENDING"
	StatusConfirmed ReservationStatus = "CONFIRMED"
	StatusCanceled  ReservationStatus = "CANCELED"
)

type Reservation struct {
	ID           uuid.UUID
	CustomerName string
	TableID      string
	DateTime     time.Time
	Status       ReservationStatus
	CreatedAt    time.Time
}

func NewReservation(id uuid.UUID, customerName, tableID string, dateTime time.Time) (*Reservation, error) {
	if dateTime.Before(time.Now()) {
		return nil, errors.New("reservation date must be in the future")
	}

	return &Reservation{
		ID:           id,
		CustomerName: customerName,
		TableID:      tableID,
		DateTime:     dateTime,
		Status:       StatusPending,
		CreatedAt:    time.Now(),
	}, nil
}

func (r *Reservation) Confirm() error {
	if r.Status == StatusCanceled {
		return errors.New("cannot confirm a canceled reservation")
	}
	r.Status = StatusConfirmed
	return nil
}

func (r *Reservation) Cancel() error {
	if r.Status == StatusCanceled {
		return errors.New("reservation is already canceled")
	}
	r.Status = StatusCanceled
	return nil
}

func (r *Reservation) IsAvailable() bool {
	return r.Status != StatusCanceled && r.DateTime.After(time.Now())
}
