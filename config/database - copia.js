const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('xthansnv_pucp', 'xthansnv_pucp', 'j4nub3tequiero', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;