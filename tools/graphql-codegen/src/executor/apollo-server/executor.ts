import { CodegenConfig, generate } from '@graphql-codegen/cli';
import { PromiseExecutor } from '@nx/devkit';
import { print } from 'graphql';
import { ApolloServerExecutorSchema } from './schema';

const runExecutor: PromiseExecutor<ApolloServerExecutorSchema> = async (options, context) => {
  const projectRoot = `${context.root}/apps/${context.projectName}`;
  const baseSchemaPath = `${projectRoot}/src/graphql/schema`;
  const typeDefs = require(baseSchemaPath).typeDefs;

  const generates = `${projectRoot}/src/graphql/generated.ts`;

  const config: CodegenConfig & { name?: string } = {
    name: context.projectName,
    overwrite: true,
    schema: print(typeDefs),
    generates: {
      [generates]: {
        plugins: ['typescript', 'typescript-resolvers'],
        config: { federation: true },
      },
    },
  };
  await generate(config);
  return {
    success: true,
  };
};

export default runExecutor;
