const express = require('express');
const { ApolloServer} = require('apollo-server-express');
const typeDefs = require("./src/schema");
const resolvers = require("./src/resolver");
const createDatabase = require('./src/config/createDatabase');
const sequelize = require('./src/config/database');

const app = express();


// Create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

(async () => {
  try {
    // Create the database if it doesn't exist
    await createDatabase('crud', 'root', 'root@123');

    // Sync Sequelize models
    await sequelize.sync();
    console.log('Database & tables created!');

    // Start Apollo Server
    await server.start();
    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () =>
      console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
  } catch (error) {
    console.error('Unable to start the server:', error);
  }
})();
