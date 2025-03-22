#!/bin/bash

# Default values
MIGRATION_DIR="migrations"
DB_DIR=""
CURRENT_DIR="$(/bin/pwd)"
DB_URL="postgres://root:Hl7FudwaSNzOhhioo0GxlmmMD0LM+I8StQIqJCZ1TPg=@localhost:5432/reservation?sslmode=disable"
COMMAND=""

# Function to display message and run command
run_command() {
    echo "Running: $1"
    eval "$1"
    if [ $? -eq 0 ]; then
        echo "✅ $2 - Success"
    else
        echo "❌ $2 - Failed"
        exit 1
    fi
}

# Parse arguments
while [ $# -gt 0 ]; do
    case "$1" in
        --dir=*)
            DB_DIR="${1#*=}"
            shift
            ;;
        --db-url=*)
            DB_URL="${1#*=}"
            shift
            ;;
        create|up|generate)
            COMMAND="$1"
            shift
            ;;
        *)
            echo "❌ Unknown argument: $1"
            echo "Usage: ./run_migration.sh [--dir=<path>] [--db-url=<url>] <command>"
            echo "Commands: create, up, generate"
            echo "Example: ./run_migration.sh --dir=\"migrations\" --db-url=\"postgres://...\" up"
            exit 1
            ;;
    esac
done

# Check if a command was provided
if [ -z "$COMMAND" ]; then
    echo "Please specify a command to run:"
    echo "  - create: Create a new migration"
    echo "  - up: Run migration up"
    echo "  - generate: Run sqlc generate"
    echo "Usage: ./run_migration.sh [--dir=<path>] [--db-url=<url>] <command>"
    echo "Example: ./run_migration.sh --dir=\"migrations\" --db-url=\"postgres://...\" up"
    exit 1
fi

cd $DB_DIR

export PATH=$PATH:$(go env GOPATH)/bin

# Execute the selected command
case "$COMMAND" in
    "create")
        run_command "migrate create -ext sql -dir \"$MIGRATION_DIR\" -seq create_reservations_table" \
            "Migration files creation"
        ;;
    "up")
        run_command "migrate -path \"$MIGRATION_DIR\" -database \"$DB_URL\" up" \
            "Database migration"
        ;;
    "generate")
        run_command "sqlc generate" \
            "SQLC code generation"
        ;;
esac

echo "🎉 Command $COMMAND completed!"