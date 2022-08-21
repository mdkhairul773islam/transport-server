const express = require('express');

const Router = express.Router();

const {
  AddBank, GetBank, DeleteBank, HandleSearch, UpdateBank, GetBankList,
} = require('../controller/Bank.controller');

Router.post('/', AddBank);
Router.get('/', GetBank);
Router.delete('/', DeleteBank);
Router.put('/', UpdateBank);
Router.get('/query', HandleSearch);
Router.get('/list', GetBankList);

module.exports = Router;
