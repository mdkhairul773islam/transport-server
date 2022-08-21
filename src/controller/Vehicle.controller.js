const {
  Insert, Select, Delete, SelectSingle, FilterQuery, Update,
} = require('../model/Vehicle.model');
// const { getDate } = require('../utility/utility');

// const updatedAt = getDate(new Date());

const table = 'vehicles';
const tableTo = 'vehicles_tax_details';

const AddVehicle = (req, res) => {
  const { vehicle, vehicleTx } = req.body;
  Insert(table, tableTo, vehicle, vehicleTx, (result) => {
    res.send(result);
  });
};

const GetVehicle = (req, res) => {
  const { perPage, currentPage } = req.query;
  Select(table, tableTo, perPage, currentPage, (result) => {
    res.send(result);
  });
};

const DeleteVehicle = (req, res) => {
  const { id } = req.query;
  Delete(table, tableTo, id, (result) => {
    res.send(result);
  });
};

const SingleVehicle = (req, res) => {
  SelectSingle(req.body.id, (result) => {
    res.send(result);
  });
};

const HandleSearch = (req, res) => {
  FilterQuery(table, req.query.data, (result) => {
    res.send(result);
  });
};

const UpdateVehicle = (req, res) => {
  const { vehicle, vehicleTx } = req.body;

  Update(table, tableTo, vehicle, vehicleTx, vehicle.id, (result) => {
    res.send(result);
  });
};

module.exports = {
  AddVehicle,
  GetVehicle,
  DeleteVehicle,
  HandleSearch,
  SingleVehicle,
  UpdateVehicle,
};
