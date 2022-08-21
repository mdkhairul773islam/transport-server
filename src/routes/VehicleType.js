const express = require('express');

const Router = express.Router();

const {
  AddVehicleType,
  GetVehicleType,
  DeleteVehicleType,
  HandleSearch,
  GetSingleVehicleType,
  UpdateVehicleType,
  GetVehicleTypeList,
} = require('../controller/VehicleType.controller');

Router.post('/', AddVehicleType);
Router.get('/', GetVehicleType);
Router.delete('/', DeleteVehicleType);
Router.put('/single', GetSingleVehicleType);
Router.put('/', UpdateVehicleType);
Router.get('/query', HandleSearch);
Router.get('/list', GetVehicleTypeList);

module.exports = Router;
