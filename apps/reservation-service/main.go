package main

import (
	server "apps/reservation-service/internal/interfaces/grpc"
)

func main() {
	server.Run()
}
