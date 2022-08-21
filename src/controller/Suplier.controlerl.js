const {
  Insert, Select, Delete, SelectSingle, FilterQuery, Update,
} = require('../model/Suplier.model');
const { getDate } = require('../utility/utility');

const updatedAt = getDate(new Date());

const table = 'suppliers';
const tableTo = 'suppliers_contact_person_details';

const AddSuplier = (req, res) => {
  const { suppliersData, suplierDetailsData } = req.body;
  Insert(table, tableTo, suppliersData, suplierDetailsData, (result) => {
    res.send(result);
  });
};

const GetSuplier = (req, res) => {
  const { perPage, currentPage } = req.query;
  Select(table, tableTo, perPage, currentPage, (result) => {
    res.send(result);
  });
};

const DeleteSuplier = (req, res) => {
  const { id } = req.query;
  Delete(table, tableTo, id, (result) => {
    res.send(result);
  });
};

const SingleSuplier = (req, res) => {
  SelectSingle(req.body.id, (result) => {
    res.send(result);
  });
};

const HandleSearch = (req, res) => {
  FilterQuery(table, req.query.data, (result) => {
    res.send(result);
  });
};

const UpdateSuplier = (req, res) => {
  const { suppliersData, suplierDetailsData } = req.body;

  Update(table, tableTo, suppliersData, suplierDetailsData, suppliersData.id, (result) => {
    res.send(result);
  });
};

module.exports = {
  AddSuplier,
  GetSuplier,
  DeleteSuplier,
  HandleSearch,
  SingleSuplier,
  UpdateSuplier,
};
