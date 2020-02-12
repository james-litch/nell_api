import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import schemaDirectives from './graphql/directives';
import { ValidationController } from './controllers';
import {
  APP_PORT, IN_PROD, DB_USERNAME, DB_PASSWORD, DB_NAME,
} from '../config';


(async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0-ovg6n.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    );

    const app = express();

    app.use(ValidationController.validateTokens);

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      schemaDirectives,
      playground: !IN_PROD,
      context: ({ req, res }) => ({ req, res }),
    });

    server.applyMiddleware({ app });

    app.listen({ port: APP_PORT }, () => console.log(`🚀 Server ready at http://localhost:${APP_PORT}${server.graphqlPath}`));
  } catch (err) {
    console.error(err);
  }
})();
