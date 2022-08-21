const {
  Insert, Select, Delete, FilterQuery, Update, SingleData,
} = require('../model/Driver.model');

const table = 'drivers';

const AddDriver = (req, res) => {
  Insert(table, req.body, (result) => res.send(result));
};

const GetDriver = (req, res) => {
  const { perPage, currentPage } = req.query;
  Select('*', table, perPage, currentPage, (result) => {
    res.send(result);
  });
};

const GetSingleDriver = (req, res) => {
  const { id } = req.query;
  SingleData('*', table, id, (result) => {
    res.send(result);
  });
};

const DeleteDriver = (req, res) => {
  const { id } = req.query;

  Delete(table, id, (result) => {
    res.send(result);
  });
};

const HandleSearch = (req, res) => {
  const { data } = req.query;

  const column = 'name';
  FilterQuery(table, column, data, (result) => {
    res.send(result);
  });
};

const UpdateDriver = (req, res) => {
  Update(table, req.body.id, req.body, (result) => {
    res.send(result);
  });
};

module.exports = {
  AddDriver,
  GetDriver,
  DeleteDriver,
  HandleSearch,
  UpdateDriver,
  GetSingleDriver,
};
