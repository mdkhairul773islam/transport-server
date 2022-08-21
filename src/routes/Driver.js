const express = require('express');

const Router = express.Router();

const {
  AddDriver, GetDriver, DeleteDriver, HandleSearch, UpdateDriver, GetSingleDriver,
} = require('../controller/Driver.controller');

Router.post('/', AddDriver);
Router.get('/', GetDriver);
Router.delete('/', DeleteDriver);
Router.put('/', UpdateDriver);
Router.get('/query', HandleSearch);
Router.get('/single', GetSingleDriver);

module.exports = Router;
