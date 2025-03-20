export { Config as DrizzleConfig } from 'drizzle-kit';
import { dbClient } from './client';
export type DBClient = typeof dbClient;
