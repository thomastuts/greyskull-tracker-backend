import { GraphQLServer } from 'graphql-yoga';
import { importSchema } from 'graphql-import';
import path from 'path';

const typeDefs = importSchema(path.join(__dirname, 'schemas/_query.graphql'));

const resolvers = {
  Query: {
    user: (_, { name }) => ({ name: name || 'John Doe' }),
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });

(async () => {
  await server.start();
  console.log('Server is running on localhost:4000');
})();
