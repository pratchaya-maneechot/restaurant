import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { join } from 'path';

const resolverFiles = loadFilesSync(join(__dirname, './resolvers'), {
  recursive: true,
  extensions: ['.ts', '.js'],
  ignoredExtensions: ['.d.ts'],
});
export const resolvers = mergeResolvers(resolverFiles);

const typeDefsArray = loadFilesSync(join(__dirname, './typeDefs'), {
  recursive: true,
  extensions: ['.graphql'],
});
export const typeDefs = mergeTypeDefs(typeDefsArray);
