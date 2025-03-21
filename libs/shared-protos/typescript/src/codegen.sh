#!/bin/bash
set -e  # Exit on any error

# Define variables
PROJECT_ROOT="$(/bin/pwd)/../_proto"
OUT_DIR="$(/bin/pwd)/src/generated"
PROTO_DIR="$PROJECT_ROOT"
BARREL_FILE="$OUT_DIR/index.ts"

# Ensure output directory exists
rm -rf $OUT_DIR || true;
mkdir -p "$OUT_DIR"
# Generate TypeScript types from proto files
$(pnpm bin)/proto-loader-gen-types \
  --longs=String \
  --enums=String \
  --defaults \
  --oneofs \
  --grpcLib=@grpc/grpc-js \
  --outDir="$OUT_DIR" \
  "$PROTO_DIR"/**/*.proto  # Handle subdirectories in proto

# Generate barrel file (index.ts) with nested exports
echo "Generating barrel file at $BARREL_FILE"
> "$BARREL_FILE"  # Clear or create the barrel file

# Function to generate exports for a directory
generate_exports() {
  local dir="$1"
  find "$dir" -type f -name "*.ts" ! -name "index.ts" | while read -r file; do
    # Calculate relative path using basename and dirname
    relative_dir=$(dirname "${file#$OUT_DIR/}")  # Remove OUT_DIR prefix and get directory
    filename=$(basename "$file" .ts)
    # Construct export path, handling root and subdirectories
    if [ "$relative_dir" != "." ]; then
      export_path="./$relative_dir/$filename"
      echo "export * from '$export_path';" >> "$BARREL_FILE"
    else
      export_path="./$filename"
      echo "export * from '$export_path';" >> "$BARREL_FILE"
    fi
  done
}
# Generate exports for root lib and subdirectories
generate_exports "$OUT_DIR"

echo "Type generation and barrel export completed."