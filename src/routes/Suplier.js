const express = require('express');

const Router = express.Router();

const {
  AddSuplier,
  GetSuplier,
  DeleteSuplier,
  HandleSearch,
  SingleSuplier,
  UpdateSuplier,
} = require('../controller/Suplier.controlerl');

Router.post('/', AddSuplier);
Router.get('/', GetSuplier);
Router.delete('/', DeleteSuplier);
Router.put('/', UpdateSuplier);
Router.put('/single', SingleSuplier);
Router.get('/query', HandleSearch);

module.exports = Router;
