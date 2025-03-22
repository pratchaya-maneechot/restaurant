#!/bin/bash
set -e

PROJECT_ROOT="$(/bin/pwd)"
APPLICATION_DIR="$PROJECT_ROOT/internal/application"

cd $APPLICATION_DIR
export PATH=$PATH:$(go env GOPATH)/bin

# Execute wire
if command -v wire >/dev/null 2>&1; then
    wire
else
    echo "Error: 'wire' command not found. Please ensure it's installed"
    echo "Try running: go install github.com/google/wire/cmd/wire@latest"
    exit 1
fi