package interceptors

import (
	"context"
	"log"

	"google.golang.org/grpc"
)

func Logger(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
	log.Printf("gRPC method called: %s", info.FullMethod)
	resp, err := handler(ctx, req)
	if err != nil {
		log.Printf("Method %s failed: %v", info.FullMethod, err)
	}
	return resp, err
}
