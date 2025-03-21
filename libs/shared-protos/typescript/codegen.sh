#!/bin/bash
set -e

PROJECT_ROOT="$(/bin/pwd)/../_proto"
OUT_DIR="$(/bin/pwd)/src/generated"
PROTO_DIR="$PROJECT_ROOT"
BARREL_FILE="$OUT_DIR/index.ts"
PROTO_FILES="$PROTO_DIR"/**/service.proto

rm -rf $OUT_DIR || true;
mkdir -p "$OUT_DIR"

if ! $(pnpm bin)/proto-loader-gen-types --version &> /dev/null; then
    echo "Installing proto-loader-gen-types..."
    pnpm add -D @grpc/proto-loader
fi

$(pnpm bin)/proto-loader-gen-types \
  --longs=String \
  --enums=String \
  --defaults \
  --oneofs \
  --grpcLib=@grpc/grpc-js \
  --outDir="$OUT_DIR" \
  $PROTO_FILES

echo "Generating barrel file at $BARREL_FILE"
> "$BARREL_FILE"

generate_exports() {
  local dir="$1"
  find "$dir" -type f -name "*.ts" ! -name "index.ts" | while read -r file; do
    relative_dir=$(dirname "${file#$OUT_DIR/}")
    filename=$(basename "$file" .ts)
    if [ "$relative_dir" != "." ]; then
      export_path="./$relative_dir/$filename"
      echo "export * from '$export_path';" >> "$BARREL_FILE"
    else
      export_path="./$filename"
      echo "export * from '$export_path';" >> "$BARREL_FILE"
    fi
  done
}

generate_exports "$OUT_DIR"

echo "Type generation and barrel export completed."