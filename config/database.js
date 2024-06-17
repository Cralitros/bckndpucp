const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pucp', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;