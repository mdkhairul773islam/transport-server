const express = require('express');

const Router = express.Router();

const {
  AddPlace, GetPlace, DeletePlace, HandleSearch, UpdatePlace,
} = require('../controller/Place.controller');

Router.post('/', AddPlace);
Router.get('/', GetPlace);
Router.delete('/', DeletePlace);
Router.put('/', UpdatePlace);
Router.get('/query', HandleSearch);

module.exports = Router;
