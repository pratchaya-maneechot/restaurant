const userResolver = {
  Query: {
    users: () => [{ id: '1', name: 'Alice' }],
  },
};
export default userResolver;
