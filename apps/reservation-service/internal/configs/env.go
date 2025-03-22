package configs

import (
	"log"
	"os"
	"strconv"
	"time"
)

type Config struct {
	DBHost     string
	DBPort     string
	DBUser     string
	DBPassword string
	DBName     string
	APITimeout time.Duration
}

func LoadConfig() Config {
	cfg := Config{
		DBHost:     getEnv("DB_HOST", "localhost"),
		DBPort:     getEnv("DB_PORT", "5432"),
		DBUser:     getEnv("DB_USER", "admin"),
		DBPassword: getEnv("DB_PASSWORD", "Hl7FudwaSNzOhhioo0GxlmmMD0LM+I8StQIqJCZ1TPg="),
		DBName:     getEnv("DB_NAME", "reservation"),
	}

	timeoutSec, err := strconv.Atoi(getEnv("API_TIMEOUT_SEC", "30"))
	if err != nil {
		log.Printf("Invalid API_TIMEOUT_SEC, using default: %v", err)
		timeoutSec = 30
	}
	cfg.APITimeout = time.Duration(timeoutSec) * time.Second

	return cfg
}

// getEnv with fallback
func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}
