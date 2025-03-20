import { mergeTypeDefs } from '@graphql-tools/merge';
import { print } from 'graphql';

export const services = ['curriculum', 'graduate', 'student', 'auth'];

export function mergeSchemas(
  rootPath: string, // 'libs',
  graphqlSchemaPath: string, // 'src/subgraphs/schemas',
  services: string[],
): string {
  const typeDefs = services.map((service) => require(`${rootPath}/${service}/${graphqlSchemaPath}`).typeDefs);
  const mergedTypeDefs = mergeTypeDefs([...typeDefs]);
  return print(mergedTypeDefs);
}
