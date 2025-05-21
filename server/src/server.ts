import express from 'express';
import path from 'node:path';
import db from './config/connection.js';
import routes from './routes/index.js';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import { getUserFromToken } from './services/auth.js';

// apoooollllooooo
const apolloServer = new ApolloServer({ typeDefs, resolvers, });

await apolloServer.start();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/graphql', expressMiddleware(apolloServer, {
  context: async ({ req }:{req: any}) => {
    const user = getUserFromToken(req.headers.authorization);
    return { user };
  },
}));

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
