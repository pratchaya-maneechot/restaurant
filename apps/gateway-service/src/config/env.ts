import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  USER_SERVICE_ENDPOINT: z.string().default('0.0.0.0:50051'),
  RESERVATION_SERVICE_ENDPOINT: z.string().default('0.0.0.0:50052'),
});

export function envConfig() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    throw new Error(`Environment validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
