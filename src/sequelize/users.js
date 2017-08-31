var Sequelize = require('sequelize');
var db = require('./db')
var Product = require('./products')
var User = db.define('user')

module.exports = User;
