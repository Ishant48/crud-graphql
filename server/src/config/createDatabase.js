const { Sequelize } = require('sequelize');

const createDatabase = async (databaseName, username, password) => {
  const sequelize = new Sequelize('', username, password, {
    host: 'localhost',
    dialect: 'mysql',
  });

  try {
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\`;`);
    console.log(`Database ${databaseName} created or already exists.`);
  } catch (error) {
    console.error('Unable to create database:', error);
  } finally {
    await sequelize.close();
  }
};

module.exports = createDatabase;
