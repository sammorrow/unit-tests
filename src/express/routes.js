const express = require('express');
const app = express()
const { Item } = require('./models')
const bodyParser = require('body-parser')


// bodyParser creates a req.body. Do not remove this middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Code here


// DO NOT REMOVE

module.exports = app
