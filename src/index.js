import { GraphQLServer } from 'graphql-yoga';
import { importSchema } from 'graphql-import';
import path from 'path';
import bodyParser from 'body-parser';

const typeDefs = importSchema(path.join(__dirname, 'schemas/_query.graphql'));

const resolvers = {
  Query: {
    viewer: (_, { name }, context) => {
      return context.user;
    },
  },
  User: {
    exercises: () => [],
  }
};

const authMiddleware = (req, res, next) => {
  const authToken = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;

  if (authToken) {
    // TODO: fetch user
    req.user = { name: authToken };
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
