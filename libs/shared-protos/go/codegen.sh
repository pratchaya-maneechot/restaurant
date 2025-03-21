#!/bin/bash
set -e

PROJECT_ROOT="$(/bin/pwd)/../_proto"
OUT_DIR="$(/bin/pwd)/generated"
PROTO_DIR="$PROJECT_ROOT"

rm -rf $OUT_DIR || true;
mkdir -p "$OUT_DIR"

export PATH="$PATH:$(go env GOPATH)/bin"
if ! command -v protoc &> /dev/null; then
    echo "Error: protoc not found. Please install Protocol Buffers."
    exit 1
fi
if ! command -v protoc-gen-go &> /dev/null; then
    echo "Installing protoc-gen-go..."
    go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
fi
if ! command -v protoc-gen-go-grpc &> /dev/null; then
    echo "Installing protoc-gen-go-grpc..."
    go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
fi

echo "Searching for service directories in $PROTO_DIR..."
SERVICE_DIRS=$(find "$PROTO_DIR" -maxdepth 1 -type d -not -path "$PROTO_DIR" -exec sh -c 'ls "{}"/*.proto >/dev/null 2>&1 && echo "{}"' \;)

if [ -z "$SERVICE_DIRS" ]; then
    echo "Error: No directories with .proto files found in $PROTO_DIR"
    ls -R "$PROTO_DIR"
    exit 1
fi

for SERVICE_DIR in $SERVICE_DIRS; do
    SERVICE_NAME=$(basename "$SERVICE_DIR")
    echo "Processing $SERVICE_NAME..."
    protoc --go_out="$OUT_DIR" --go-grpc_out="$OUT_DIR" --proto_path="$SERVICE_DIR" "$SERVICE_DIR"/*.proto
done

echo "Generated Go and TypeScript files successfully."