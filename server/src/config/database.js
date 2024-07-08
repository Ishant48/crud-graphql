const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('crud', 'root', 'root@123', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
