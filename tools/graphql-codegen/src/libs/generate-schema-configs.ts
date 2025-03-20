import type { CodegenConfig } from '@graphql-codegen/cli';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { print } from 'graphql';

const services = ['curriculum', 'graduate', 'student', 'auth'];
const rootPath = 'libs';
const graphqlPath = 'subgraphs';

function mergeSchemas(services: string[]): string {
  const typeDefs = services.map(
    (service) => require(`../../../${rootPath}/${service}/src/${graphqlPath}/schemas`).typeDefs,
  );
  const mergedTypeDefs = mergeTypeDefs([...typeDefs]);
  return print(mergedTypeDefs);
}

export const mergedSchema = mergeSchemas(services);

export const generateConfigApolloServer = (): (CodegenConfig & {
  name?: string;
})[] => {
  return services.map((service) => {
    const typeDefs = require(`../${rootPath}/${service}/src/${graphqlPath}/schemas`).typeDefs;

    const generates = `./${rootPath}/${service}/src/${graphqlPath}/generated.ts`;
    console.log(generates);
    const configs: CodegenConfig & { name?: string } = {
      name: service,
      overwrite: true,
      schema: print(typeDefs),
      generates: {
        [generates]: {
          plugins: ['typescript', 'typescript-resolvers'],
          config: { federation: true },
        },
      },
    };
    return configs;
  });
};
