const User = require('./models/Users');

const resolvers = {
  Query: {
    users: async () => await User.findAll(),
    user: async (parent, { id }) => await User.findByPk(id),
  },
  Mutation: {
    createUser: async (parent, { name, email }) => {
      try {
        const user = await User.create({ name, email });
        return user;
      } catch (error) {
        console.error('Error creating user:', error);
        throw new Error(error.parent);
      }
    },
    updateUser: async (parent, { id, name, email }) => {
      try {
        const user = await User.findByPk(id);
        if (!user) {
          throw new Error('User not found');
        }
        if (name) user.name = name;
        if (email) user.email = email;
        await user.save();
        return user;
      } catch (error) {
        console.error('Error updating user:', error);
        throw new Error(error.parent);
      }
    },
    deleteUser: async (parent, { id }) => {
      try {
        const user = await User.findByPk(id);
        if (!user) {
          throw new Error('User not found');
        }
        await user.destroy();
        return user;
      } catch (error) {
        console.error('Error deleting user:', error);
        throw new Error(error);
      }
    },
  },
};

module.exports = resolvers;
