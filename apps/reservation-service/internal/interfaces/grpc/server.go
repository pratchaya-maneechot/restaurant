package server

import (
	"apps/reservation-service/internal/application"
	grpc_handler "apps/reservation-service/internal/interfaces/grpc/handlers"
	"apps/reservation-service/internal/interfaces/grpc/interceptors"
	"log"
	"net"
	"os"
	"os/signal"
	"sync"
	"syscall"

	pb "libs/shared-protos/go/generated/reservation_service/proto"

	"google.golang.org/grpc"
)

func Run() {
	log.SetFlags(log.LstdFlags | log.Lshortfile)
	app := application.InitializeApp()
	// Server config
	port := ":50051"
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	// Create gRPC server with options
	grpcServer := grpc.NewServer(
		grpc.UnaryInterceptor(interceptors.Logger),
	)

	// Register service
	pb.RegisterReservationServiceServer(grpcServer, grpc_handler.NewReservationServer(app.CommandBus, app.QueryBus))

	// Graceful shutdown
	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)

	wg := sync.WaitGroup{}
	wg.Add(1)

	// Start server
	go func() {
		defer wg.Done()
		log.Printf("Server starting on port %s...", port)
		if err := grpcServer.Serve(lis); err != nil {
			log.Fatalf("failed to serve: %v", err)
		}
	}()

	// Wait for shutdown signal
	<-sigChan
	log.Println("Shutting down server...")

	// Graceful shutdown
	grpcServer.GracefulStop()
	wg.Wait()
	log.Println("Server stopped")

}
