#!/bin/bash
set -e

if [ $# -ne 1 ]; then
    echo "Usage: $0 <application_directory>"
    echo "Example: $0 /path/to/app"
    exit 1
fi

APPLICATION_DIR="$1"

if [ ! -d "$APPLICATION_DIR" ]; then
    echo "Error: Directory '$APPLICATION_DIR' does not exist or is not accessible"
    exit 1
fi

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