package main

import (
	"apps/reservation-service/internal/application"
	"apps/reservation-service/internal/interfaces/grpc"
	"context"
	"log"
	"net"
)

func main() {
	ctx := context.Background()
	app := application.InitializeApp()

	// gRPC Server
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	grpcServer := grpc.NewServer()
	pb.RegisterReservationServiceServer(grpcServer, grpc.NewReservationServer(app.CommandBus, app.QueryBus))
	log.Println("gRPC server running on :50051")
	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
