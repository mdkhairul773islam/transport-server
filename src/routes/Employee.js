const express = require('express');

const Router = express.Router();

const {
  SingleEmployee, AddEmployee, GetEmployee, DeleteEmployee, HandleSearch, UpdateEmployee,
} = require('../controller/Employee.controller');

Router.post('/', AddEmployee);
Router.get('/', GetEmployee);
Router.delete('/', DeleteEmployee);
Router.put('/', UpdateEmployee);
Router.get('/query', HandleSearch);
Router.put('/single', SingleEmployee);

module.exports = Router;
