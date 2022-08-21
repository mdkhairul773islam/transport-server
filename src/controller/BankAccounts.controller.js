const {
  Insert, Select, Delete, FilterQuery, Update,
} = require('../model/BankAccounts.model');

const table = 'bank_accounts';
const tableTo = 'banks';

const AddBankAccounts = (req, res) => {
  Insert(table, req.body, tableTo, (result) => res.send(result));
};

const GetBankAccounts = (req, res) => {
  const { perPage, currentPage } = req.query;
  Select(['bank_accounts.*', 'banks.bank_name', 'banks.branch_name'], table, tableTo, perPage, currentPage, (result) => {
    res.send(result);
  });
};

const DeleteBankAccounts = (req, res) => {
  const { id } = req.query;

  Delete(table, id, tableTo, (result) => {
    res.send(result);
  });
};

const HandleSearch = (req, res) => {
  FilterQuery(table, req.query.data, (result) => {
    res.send(result);
  });
};

const UpdateBankAccounts = (req, res) => {
  Update(table, req.body.id, req.body, tableTo, (result) => {
    res.send(result);
  });
};

module.exports = {
  AddBankAccounts,
  GetBankAccounts,
  DeleteBankAccounts,
  HandleSearch,
  UpdateBankAccounts,
};
