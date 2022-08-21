const {
  Insert, Select, Delete, FilterQuery, Update, SelectSingle,
} = require('../model/Employee.model');

const table = 'employees';

const AddEmployee = (req, res) => {
  Insert(table, req.body, (result) => res.send(result));
};

const GetEmployee = (req, res) => {
  const { perPage, currentPage } = req.query;
  Select('*', table, perPage, currentPage, (result) => {
    res.send(result);
  });
};

const DeleteEmployee = (req, res) => {
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

const UpdateEmployee = (req, res) => {
  Update(table, req.body.id, req.body, (result) => {
    res.send(result);
  });
};

const SingleEmployee = (req, res) => {
  SelectSingle('*', table, req.body.id, (result) => {
    res.send(result);
  });
};

module.exports = {
  SingleEmployee,
  AddEmployee,
  GetEmployee,
  DeleteEmployee,
  HandleSearch,
  UpdateEmployee,
};
