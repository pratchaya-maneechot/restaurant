package interceptors

import (
	"context"
	"log"

	"google.golang.org/grpc"
)

func Logger(ctx context.Context, req any, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (any, error) {
	log.Printf("gRPC method called: %s", info.FullMethod)
	resp, err := handler(ctx, req)
	if err != nil {
		log.Printf("Method %s failed: %v", info.FullMethod, err)
	}
	return resp, err
}
