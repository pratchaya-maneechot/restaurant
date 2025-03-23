import { ApolloServer, ApolloServerPlugin } from '@apollo/server';
import {
  ApolloServerPluginInlineTraceDisabled,
  ApolloServerPluginLandingPageDisabled,
} from '@apollo/server/plugin/disabled';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloLoggerPlugin, logger } from '@restaurant/shared-utils';
import http from 'http';
import { resolvers, typeDefs } from './schema';
import { IAppContext } from './types';

export async function graphqlServer(httpServer: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) {
  const plugins: ApolloServerPlugin<IAppContext>[] = [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    ApolloServerPluginInlineTraceDisabled(),
    ApolloLoggerPlugin(),
  ];

  if (process.env.NODE_ENV === 'production') {
    plugins.push(ApolloServerPluginLandingPageDisabled());
  }

  const server = new ApolloServer({
    resolvers,
    typeDefs,
    plugins,
    logger,
  });

  await server.start();

  return server;
}
