package repository

import (
	"apps/reservation-service/internal/domain"
	db "apps/reservation-service/internal/infrastructure/db/generated"
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"
)

type ReservationRepositoryImpl struct {
	queries *db.Queries
}

func NewReservationRepository(pool *pgxpool.Pool) domain.ReservationRepository {
	return &ReservationRepositoryImpl{
		queries: db.New(pool),
	}
}

func (r *ReservationRepositoryImpl) Save(ctx context.Context, reservation *domain.Reservation) error {
	dateTime := pgtype.Timestamp{Time: reservation.DateTime, Valid: true}
	result, err := r.queries.SaveReservation(ctx, db.SaveReservationParams{
		ID:           encodeUID(reservation.ID),
		CustomerName: reservation.CustomerName,
		TableID:      reservation.TableID,
		DateTime:     dateTime,
		Status:       string(reservation.Status),
	})
	if err != nil {
		return err
	}

	reservation.CustomerName = result.CustomerName
	reservation.TableID = result.TableID
	reservation.DateTime = decodeTimestamp(result.DateTime)
	reservation.Status = domain.ReservationStatus(result.Status)
	reservation.CreatedAt = decodeTimestamp(result.CreatedAt)
	return nil
}

func (r *ReservationRepositoryImpl) FindByID(ctx context.Context, id uuid.UUID) (*domain.Reservation, error) {
	result, err := r.queries.FindReservationByID(ctx, encodeUID(id))
	if err != nil {
		return nil, err
	}
	return &domain.Reservation{
		ID:           decodeUID(result.ID),
		CustomerName: result.CustomerName,
		TableID:      result.TableID,
		DateTime:     decodeTimestamp(result.DateTime),
		Status:       domain.ReservationStatus(result.Status),
		CreatedAt:    decodeTimestamp(result.CreatedAt),
	}, nil
}

func (r *ReservationRepositoryImpl) FindAll(ctx context.Context) ([]*domain.Reservation, error) {
	results, err := r.queries.FindAllReservations(ctx)
	if err != nil {
		return nil, err
	}
	reservations := make([]*domain.Reservation, len(results))
	for i, result := range results {
		reservations[i] = &domain.Reservation{
			ID:           decodeUID(result.ID),
			CustomerName: result.CustomerName,
			TableID:      result.TableID,
			DateTime:     decodeTimestamp(result.DateTime),
			Status:       domain.ReservationStatus(result.Status),
			CreatedAt:    decodeTimestamp(result.CreatedAt),
		}
	}
	return reservations, nil
}

func (r *ReservationRepositoryImpl) FindAvailableTables(ctx context.Context, dateTime time.Time) ([]string, error) {
	results, err := r.queries.FindAvailableTables(ctx, encodeTimestamp(dateTime))
	if err != nil {
		return nil, err
	}
	return results, nil
}

func encodeUID(id uuid.UUID) pgtype.UUID {
	return pgtype.UUID{
		Bytes: [16]byte(id),
		Valid: true,
	}
}

func encodeTimestamp(t time.Time) pgtype.Timestamp {
	return pgtype.Timestamp{
		Time:  t,
		Valid: true,
	}
}

func decodeUID(id pgtype.UUID) uuid.UUID {
	var uid uuid.UUID
	copy(uid[:], id.Bytes[:])
	return uid
}

func decodeTimestamp(t pgtype.Timestamp) time.Time {
	return t.Time
}
