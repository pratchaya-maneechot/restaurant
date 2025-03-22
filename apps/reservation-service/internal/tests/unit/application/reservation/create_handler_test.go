package reservation

import (
	handler "apps/reservation-service/internal/application/commands/reservation"
	"apps/reservation-service/internal/application/commands/reservation/defs"
	"apps/reservation-service/internal/domain"
	mock "apps/reservation-service/internal/tests/mock/generated"
	"context"
	"fmt"
	"testing"
	"time"

	"github.com/golang/mock/gomock"
	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
)

func TestCreateHandler_Handle(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	repo := mock.NewMockReservationRepository(ctrl)

	// Use a future time for the reservation
	futureTime := time.Now().Add(24 * time.Hour)

	// Expect the Save call with a reservation that will be populated
	repo.EXPECT().
		Save(gomock.Any(), gomock.AssignableToTypeOf(&domain.Reservation{})).
		Do(func(ctx context.Context, r *domain.Reservation) {
			r.ID = uuid.New()
			r.CreatedAt = time.Now()
		}).
		Return(nil)

	handler := handler.NewCreateReservationHandler(repo)
	ctx := context.Background()

	cmd := defs.CreateReservationCommand{
		ReservationID: uuid.New(),
		CustomerName:  "Jane Doe",
		TableID:       "table-02",
		DateTime:      futureTime, // Use future time instead of time.Now()
	}

	id, err := handler.Handle(ctx, cmd)
	fmt.Println("Hello, World!", id)
	assert.NoError(t, err)
	assert.NotEqual(t, uuid.Nil, id, "ID should be generated")
}
