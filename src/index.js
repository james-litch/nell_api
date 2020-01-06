import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import { userFromToken } from './controllers/user';
import schemaDirectives from './graphql/directives';
import {
  APP_PORT, IN_PROD, DB_USERNAME, DB_PASSWORD, DB_NAME,
} from '../config';

(async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0-ovg6n.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true },
    );

    const app = express();

    app.disable('x-powered-by');

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      schemaDirectives,
      playground: !IN_PROD,
      context: async ({ req, res }) => {
        const token = req.headers.authorization || '';
        const user = await userFromToken(token);
        return { user };
      },
    });

    server.applyMiddleware({ app });

    app.listen({ port: APP_PORT }, () => console.log(`🚀 Server ready at http://localhost:${APP_PORT}${server.graphqlPath}`));
  } catch (err) {
    console.error(err);
  }
})();
