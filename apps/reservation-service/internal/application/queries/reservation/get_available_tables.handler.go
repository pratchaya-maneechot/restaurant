package query

import (
	definition "apps/reservation-service/internal/application/queries/reservation/definitions"
	"apps/reservation-service/internal/domain"
	"apps/reservation-service/internal/infrastructure/query_bus"
	"context"
	"fmt"
)

type GetAvailableTablesHandler struct {
	repo domain.ReservationRepository
}

func NewGetAvailableTablesHandler(repo domain.ReservationRepository) *GetAvailableTablesHandler {
	return &GetAvailableTablesHandler{repo: repo}
}

func (h *GetAvailableTablesHandler) Handle(ctx context.Context, query query_bus.Query) (interface{}, error) {
	params, ok := query.(definition.GetAvailableTablesQuery)
	if !ok {
		return nil, fmt.Errorf("invalid query type: expected GetAvailableTablesQuery, got %T", query)
	}
	return h.repo.FindAvailableTables(ctx, params.DateTime)
}
