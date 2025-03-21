package definition

import (
	"time"
)

type GetAvailableTablesQuery struct {
	DateTime time.Time
}

func (q GetAvailableTablesQuery) Type() string {
	return "GetAvailableTables"
}
