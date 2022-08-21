const express = require('express');

const Router = express.Router();

const {
  AddBranch, GetBranch, DeleteBranch, HandleSearch, UpdateBranch, GetBranchList,
} = require('../controller/Branch.controller');

Router.post('/', AddBranch);
Router.get('/', GetBranch);
Router.get('/list', GetBranchList);
Router.delete('/', DeleteBranch);
Router.put('/', UpdateBranch);
Router.get('/query', HandleSearch);

module.exports = Router;
