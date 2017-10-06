const express = require('express');
const app = express()
const { Item } = require('./models')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/catalog', (req, res) => {
  res.sendStatus(200)
})

app.get('/catalog/:urlTitle', (req, res, next ) => {
  Item.findOne({where: {urlTitle: req.params.urlTitle}})
  .then(returnedItem => {
    if (returnedItem) res.json(returnedItem)
    else res.sendStatus(404);
  })
  .catch(next)
})

app.get('/catalog/search/:itemName', (req, res, next) => {
  res.sendStatus(200);
})


app.get('/catalog/:urlTitle/similar', (req, res, next) => {
  Item.findOne({
    where: {
        urlTitle: req.params.urlTitle
    }
  })
  .then(function (item) {
    if (!item) {
      const err = new Error('Item not found!');
      err.status = 404;
      throw (err);
    }
    return item.findSimilar();
    })
    .then((similarItems) => {
      res.json(similarItems)
    })
    .catch(next);
})

app.post('/api/item', (req, res, next) => {
  Item.create(req.body)
  .then(() => {
    res.sendStatus(302)
  })
  .catch(next)
})


module.exports = app
