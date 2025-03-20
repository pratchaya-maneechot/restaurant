package main

import (
	"apps/reservation-service/internal/domain"
	"fmt"
	"time"
)

func main() {
	reservation, err := domain.NewReservation("res-001", "John Doe", "table-01", time.Now().Add(24*time.Hour))
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	event := domain.NewReservationCreated(reservation)
	fmt.Printf("Event: %+v\n", event)

	if err := reservation.Cancel(); err != nil {
		fmt.Println("Error:", err)
		return
	}

	cancelEvent := domain.NewReservationCanceled(reservation)
	fmt.Printf("Cancel Event: %+v\n", cancelEvent)
}
