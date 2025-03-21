package repository

import (
	"apps/reservation-service/internal/domain"
	"context"
	"errors"
	"sync"
	"time"
)

type InMemoryReservationRepository struct {
	reservations map[string]*domain.Reservation
	mu           sync.Mutex
}

func NewInMemoryReservationRepository() *InMemoryReservationRepository {
	return &InMemoryReservationRepository{
		reservations: make(map[string]*domain.Reservation),
	}
}

func ProvideReservationRepository() domain.ReservationRepository {
	repo := NewInMemoryReservationRepository()
	return repo
}

func (r *InMemoryReservationRepository) Save(ctx context.Context, reservation *domain.Reservation) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	r.reservations[reservation.ID] = reservation
	return nil
}

func (r *InMemoryReservationRepository) FindByID(ctx context.Context, id string) (*domain.Reservation, error) {
	r.mu.Lock()
	defer r.mu.Unlock()
	if res, exists := r.reservations[id]; exists {
		return res, nil
	}
	return nil, errors.New("reservation not found")
}

func (r *InMemoryReservationRepository) FindAll(ctx context.Context) ([]*domain.Reservation, error) {
	r.mu.Lock()
	defer r.mu.Unlock()
	var result []*domain.Reservation
	for _, res := range r.reservations {
		result = append(result, res)
	}
	return result, nil
}

func (r *InMemoryReservationRepository) FindAvailableTables(ctx context.Context, dateTime time.Time) ([]string, error) {
	allTables := []string{"table-01", "table-02", "table-03", "table-04", "table-05"} // mock
	r.mu.Lock()
	defer r.mu.Unlock()
	reservedTables := make(map[string]bool)
	for _, res := range r.reservations {
		if res.DateTime.Equal(dateTime) && res.Status != domain.StatusCanceled {
			reservedTables[res.TableID] = true
		}
	}
	var available []string
	for _, table := range allTables {
		if !reservedTables[table] {
			available = append(available, table)
		}
	}
	return available, nil
}
