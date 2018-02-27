export default {
  Query: {
    viewer: (_, { name }, context) => {
      return context.user;
    },
  }
};
