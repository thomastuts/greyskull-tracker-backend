import { GraphQLServer } from 'graphql-yoga';
import { importSchema } from 'graphql-import';
import path from 'path';
import bodyParser from 'body-parser';

import { getUser } from './repositories/users';
import queryResolver from './resolvers/query';
import mutationResolver from './resolvers/mutation';
import userResolver from './resolvers/user';

const typeDefs = importSchema(path.join(__dirname, 'schemas/_root.graphql'));

const resolvers = {
  ...queryResolver,
  ...mutationResolver,
  ...userResolver,
};

const authMiddleware = async (req, res, next) => {
  const authToken = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;

  if (authToken) {
    // TODO: fetch user
    req.user = await getUser(1);
  }

  next();
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: ({ request }) => {
    return {
      user: request.user,
    };
  }
});

server.express.use(bodyParser.json());
server.express.use(authMiddleware);

server.express.post('/login', (req, res) => {
  res.json({
    authToken: 'TODO',
  });
});

(async () => {
  await server.start();
  console.log('Server is running on localhost:4000');
})();
