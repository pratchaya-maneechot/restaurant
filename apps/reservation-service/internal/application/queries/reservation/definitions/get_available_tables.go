package definitions

import (
	"apps/reservation-service/internal/domain"
	"context"
	"time"
)

type GetAvailableTablesQuery struct {
	DateTime time.Time
}

func (q GetAvailableTablesQuery) Type() string {
	return "GetAvailableTables"
}

type GetAvailableTablesHandler struct {
	repo domain.ReservationRepository
}

func NewGetAvailableTablesHandler(repo domain.ReservationRepository) *GetAvailableTablesHandler {
	return &GetAvailableTablesHandler{repo: repo}
}

func (h *GetAvailableTablesHandler) Handle(ctx context.Context, query GetAvailableTablesQuery) (interface{}, error) {
	return h.repo.FindAvailableTables(ctx, query.DateTime)
}
