const express = require('express');

const Router = express.Router();

const {
  AddArticle, GetArticle, DeleteArticle, HandleSearch, UpdateArticle,
} = require('../controller/Articles.controller');

Router.post('/', AddArticle);
Router.get('/', GetArticle);
Router.delete('/', DeleteArticle);
Router.put('/', UpdateArticle);
Router.get('/query', HandleSearch);

module.exports = Router;
