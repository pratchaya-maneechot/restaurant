package defs

import (
	"apps/reservation-service/internal/config"
	"time"
)

type GetAvailableTablesQuery struct {
	DateTime time.Time
}

func (q GetAvailableTablesQuery) Type() string {
	return config.GetAvailableTables
}
