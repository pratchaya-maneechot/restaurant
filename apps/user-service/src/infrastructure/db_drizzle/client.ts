import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '../../domain/tables';
import { queryClient } from './connection';

export const dbClient = drizzle(queryClient, { schema });
