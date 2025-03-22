package definition

import (
	"apps/reservation-service/internal/configs"
	"time"
)

type GetAvailableTablesQuery struct {
	DateTime time.Time
}

func (q GetAvailableTablesQuery) Type() string {
	return configs.GetAvailableTables
}
