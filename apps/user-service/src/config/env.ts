import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  API_PORT: z.string().transform((d) => Number(d)),
  GRPC_PORT: z
    .string()
    .default('50051')
    .transform((d) => Number(d)),
  LOG_LEVEL: z.string().optional().default('info'),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.string().transform((d) => Number(d)),
  SSL_MODE: z.enum(['require', 'allow', 'prefer', 'verify-full']).optional(),
});

export function envConfig() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    throw new Error(`Environment validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
