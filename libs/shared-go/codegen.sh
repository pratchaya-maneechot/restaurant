#!/bin/bash
set -e  # Exit on any error
export PATH="$PATH:$(go env GOPATH)/bin";
protoc --go_out=. --go-grpc_out=. --proto_path="/Users/peeter/Desktop/Top/restaurant/libs/shared-protos/src/protos/reservation_service" /Users/peeter/Desktop/Top/restaurant/libs/shared-protos/src/protos/reservation_service/service.proto