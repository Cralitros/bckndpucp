const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('xnuvqsrh_unsa', 'xnuvqsrh_unsa', 'j4nub3tequiero', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;