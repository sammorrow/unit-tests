var Sequelize = require('sequelize');
var db = require('./db')

var Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Product;
