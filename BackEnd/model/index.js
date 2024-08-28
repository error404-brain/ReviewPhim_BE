const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('MovieDataBase', 'root', 'Hung199535hcm@', {
  host: 'localhost',
  dialect: 'mysql'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Movie = require('./movie')(sequelize, DataTypes);

module.exports = db;
