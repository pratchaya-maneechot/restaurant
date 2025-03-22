package reservation

import (
	defs "apps/reservation-service/internal/application/queries/reservation/defs"
	"apps/reservation-service/internal/domain"
	"apps/reservation-service/internal/infrastructure/querybus"
	"context"
	"fmt"
)

type GetAvailableTablesHandler struct {
	repo domain.ReservationRepository
}

func NewGetAvailableTablesHandler(repo domain.ReservationRepository) *GetAvailableTablesHandler {
	return &GetAvailableTablesHandler{repo: repo}
}

func (h *GetAvailableTablesHandler) Handle(ctx context.Context, query querybus.Query) (any, error) {
	params, ok := query.(defs.GetAvailableTablesQuery)
	if !ok {
		return nil, fmt.Errorf("invalid query type: expected GetAvailableTablesQuery, got %T", query)
	}
	return h.repo.FindAvailableTables(ctx, params.DateTime)
}
