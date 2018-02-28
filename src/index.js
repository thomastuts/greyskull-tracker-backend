import { GraphQLServer } from 'graphql-yoga';
import { importSchema } from 'graphql-import';
import path from 'path';
import bodyParser from 'body-parser';
import { sign, verify } from 'jsonwebtoken';
import { createPasswordHash, comparePassword } from './lib/auth';

import { createUser, getUserById, getUserByUsername } from './repositories/users';
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
    req.user = await getUserById(1);
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

server.express.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await createUser({ username, plaintextPassword: password, email });
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      created_at: user.created_at,
    });
  } catch (err) {
    res.status(500).json({
      error: 'USERNAME_OR_EMAIL_EXISTS',
    });
  }
});

server.express.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await getUserByUsername(username);
    res.json(user);
  } catch (err) {
    res.json(404, {
      error: 'User not found',
    });
  }
});

(async () => {
  await server.start();
  console.log('Server is running on localhost:4000');
})();
