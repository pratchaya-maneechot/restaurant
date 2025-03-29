import { CodegenConfig, generate } from '@graphql-codegen/cli';
import { PromiseExecutor } from '@nx/devkit';
import { mergeSchemas } from '../libs/merge-schema';
import { ApolloClientExecutorSchema } from './schema';

const runExecutor: PromiseExecutor<ApolloClientExecutorSchema> = async (options, context) => {
  const mergedSchema = mergeSchemas(`${context.root}/apps`, 'src/graphql/schema', ['gateway-service']);

  const config: CodegenConfig = {
    overwrite: true,
    schema: mergedSchema,
    documents: `${context.root}/libs/${context.projectName}/${options.documentPath}`,
    generates: {
      [`${context.root}/libs/${context.projectName}/${options.generatedPath}`]: {
        plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
        config: {
          withHooks: true,
          withRefetchFn: true,
          withMutationFn: true,
        },
      },
    },
  };

  await generate(config);
  console.log(`🚀 generated all schemas success 🚀`);

  return {
    success: true,
  };
};

export default runExecutor;
