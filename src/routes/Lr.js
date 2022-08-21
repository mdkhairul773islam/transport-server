/* eslint-disable object-curly-newline */
const express = require('express');

const Router = express.Router();

const { AddLr, GetLr, DeleteLr, HandleSearch, Invoice, UpdateLr } = require('../controller/Lr.controller');

Router.post('/', AddLr);
Router.get('/', GetLr);
Router.delete('/', DeleteLr);
Router.put('/', UpdateLr);
Router.get('/invoice', Invoice);
Router.get('/query', HandleSearch);

module.exports = Router;
