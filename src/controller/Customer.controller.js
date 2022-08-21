const {
  Insert, Select, Delete, SelectSingle, FilterQuery, Update,
} = require('../model/Customer.model');

const table = 'customers';
const tableTo = 'customer_references';

const AddCustomer = (req, res) => {
  const { customers, customerReferences } = req.body;
  Insert(table, tableTo, customers, customerReferences, (result) => {
    res.send(result);
  });
};

const GetCustomer = (req, res) => {
  const { perPage, currentPage } = req.query;
  Select(table, tableTo, perPage, currentPage, (result) => {
    res.send(result);
  });
};

const DeleteCustomer = (req, res) => {
  const { id } = req.query;

  Delete(table, tableTo, id, (result) => {
    res.send(result);
  });
};

const SingleCustomer = (req, res) => {
  SelectSingle(req.body.id, (result) => {
    res.send(result);
  });
};

const HandleSearch = (req, res) => {
  FilterQuery(table, req.query.data, (result) => {
    res.send(result);
  });
};

const UpdateCustomer = (req, res) => {
  const { customers, customerReferences } = req.body;
  Update(table, tableTo, customers, customerReferences, customers.id, (result) => {
    res.send(result);
  });
};

module.exports = {
  AddCustomer,
  GetCustomer,
  DeleteCustomer,
  HandleSearch,
  SingleCustomer,
  UpdateCustomer,
};
