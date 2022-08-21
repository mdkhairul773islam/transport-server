const express = require('express');

const Router = express.Router();

const {
  AddBankAccounts, GetBankAccounts, DeleteBankAccounts, HandleSearch, UpdateBankAccounts,
} = require('../controller/BankAccounts.controller');

Router.post('/', AddBankAccounts);
Router.get('/', GetBankAccounts);
Router.delete('/', DeleteBankAccounts);
Router.put('/', UpdateBankAccounts);
Router.get('/query', HandleSearch);

module.exports = Router;
