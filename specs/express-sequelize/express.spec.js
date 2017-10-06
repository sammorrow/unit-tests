//tests routes.js

var Promise = require('bluebird');
var chai = require('chai');
var expect = chai.expect;
var { Item, User } = require('../../src/express/models');
var supertest = require('supertest-as-promised');
var testRoutes = require('../../src/express/routes');
var agent = supertest.agent(testRoutes);

// THESE TESTS WILL NOT RUN IF YOU DO NOT CREATE A DATABASE NAMED 'expresstests'
//open your psql shell (type 'psql' in a terminal) and enter the command 'CREATE DATABASE expresstests;'

describe('http requests', () => {
  before(() => {
    return User.sync({force: true})
    .then(function () {
      return Item.sync({force: true});
    });
  });

  beforeEach(() => Item.truncate());

  describe('GET /catalog', () => {
    it('responds with 200', (done) => {
      agent.get('/catalog').expect(200, done);
    });
  });

  describe('GET /notaroute', () => {
    it('responds with a 404', () => {
      return agent.get('/notaroute').expect(404);
    });
  });

  describe('GET /catalog/:itemName', () => {
    it('responds with 404 on an item that does not exist', () => {
      return agent.get('/catalog/sweet').expect(404);
    });
    it('responds with 200 on an item that does exist', () => {
      return Item.create({
        name: "Fools' Gold",
        content: 'Real gold',
        price: '$300'
      }).then(()=> {
        return agent.get('/catalog/fools_gold').expect(200);
      })
    });
  });

  describe('GET /catalog/search', () => {
    it('responds with 200', () => {
      return agent.get('/catalog/search/whatever').expect(200);
    });
  });

  describe('GET /catalog/:itemName/similar', () => {
    it('responds with 404 for an item that does not exist', () => {
      return agent.get('/item/not_exist/similar').expect(404);
    });
  });

  describe('POST /api/item', () => {
    it('responds with 302', () => {
      return agent
      .post('/api/item/')
      .send({
        name: "A new item",
        content: 'Brand-new',
        price: '$300'
      })
      .expect(302);
    });
    it('creates an Item in the database', (done) => {
      agent
      .post('/api/item/')
      .send({
        name: "A newer item",
        content: 'Cutting edge',
        price: '$300'
      })
      .then(() => {
        return Item.findOne({where:{name:'A newer item'}})
      })
      .then((Item) => {
        expect(Item.name).to.equal('A newer item');
        done();
      })
      .catch(done)
    });
  });
});
