import { defineConfig } from 'drizzle-kit';
import { envConfig } from '../../configs/env';

const env = envConfig();

export default defineConfig({
  dialect: 'postgresql',
  out: './src/infrastructure/db_drizzle/migrations',
  schema: './src/domain/tables.ts',
  dbCredentials: {
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: 'user',
    ssl: env.SSL_MODE,
  },
  verbose: true,
  strict: true,
});
