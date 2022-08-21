const express = require('express');

const Router = express.Router();

const {
  AddCustomer,
  GetCustomer,
  DeleteCustomer,
  HandleSearch,
  SingleCustomer,
  UpdateCustomer,
} = require('../controller/Customer.controller');

Router.post('/', AddCustomer);
Router.get('/', GetCustomer);
Router.delete('/', DeleteCustomer);
Router.put('/', UpdateCustomer);
Router.put('/single', SingleCustomer);
Router.get('/query', HandleSearch);

module.exports = Router;
