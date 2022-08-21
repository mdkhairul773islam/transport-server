const {
  Insert, Select, Delete, FilterQuery, SingleVehicleType, Update,
} = require('../model/VehicleType.model');

const table = 'vehicle_types';

const AddVehicleType = (req, res) => {
  Insert(table, req.body, (result) => res.send(result));
};

const GetVehicleType = (req, res) => {
  const { perPage, currentPage } = req.query;
  Select('*', table, perPage, currentPage, (result) => {
    res.send(result);
  });
};

const DeleteVehicleType = (req, res) => {
  const { id } = req.query;

  Delete(table, id, (result) => {
    res.send(result);
  });
};

const HandleSearch = (req, res) => {
  FilterQuery(table, req.query.data, (result) => {
    res.send(result);
  });
};

const GetSingleVehicleType = (req, res) => {
  SingleVehicleType(table, req.body.id, (result) => {
    res.send(result);
  });
};

const UpdateVehicleType = (req, res) => {
  Update(table, req.body.id, req.body, (result) => {
    res.send(result);
  });
};

const GetVehicleTypeList = (_, res) => {
  Select(['id', 'vehicle_type'], table, (result) => {
    res.send(result);
  });
};

module.exports = {
  AddVehicleType,
  GetVehicleType,
  DeleteVehicleType,
  HandleSearch,
  GetSingleVehicleType,
  UpdateVehicleType,
  GetVehicleTypeList,
};
