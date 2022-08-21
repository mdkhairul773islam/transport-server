const express = require('express');

const Router = express.Router();

const {
  AddVehicle,
  GetVehicle,
  DeleteVehicle,
  HandleSearch,
  SingleVehicle,
  UpdateVehicle,
} = require('../controller/Vehicle.controller');

Router.post('/', AddVehicle);
Router.get('/', GetVehicle);
Router.delete('/', DeleteVehicle);
Router.put('/', UpdateVehicle);
Router.put('/single', SingleVehicle);
Router.get('/query', HandleSearch);

module.exports = Router;
