const {
  Insert, Select, List, Delete, FilterQuery, Update,
} = require('../model/Bank.model');

const table = 'banks';

const AddBank = (req, res) => {
  Insert(table, req.body, (result) => res.send(result));
};

const GetBank = (req, res) => {
  const { perPage, currentPage } = req.query;
  Select('*', table, perPage, currentPage, (result) => {
    res.send(result);
  });
};

const DeleteBank = (req, res) => {
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

const UpdateBank = (req, res) => {
  Update(table, req.body.id, req.body, (result) => {
    res.send(result);
  });
};

const GetBankList = (_, res) => {
  List(['id', 'bank_name'], table, (result) => {
    res.send(result);
  });
};

module.exports = {
  AddBank, GetBank, DeleteBank, HandleSearch, UpdateBank, GetBankList,
};
