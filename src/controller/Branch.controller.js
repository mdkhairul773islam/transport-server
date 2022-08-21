const { Insert, Select, Delete, FilterQuery, Update } = require('../model/Branch.model');

const table = 'branches';

const AddBranch = (req, res) => {
  Insert(table, req.body, (result) => res.send(result));
};

const GetBranch = (req, res) => {
  const { perPage, currentPage } = req.query;

  Select('*', table, perPage, currentPage, (result) => {
    res.send(result);
  });
};

const DeleteBranch = (req, res) => {
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

const UpdateBranch = (req, res) => {
  Update(table, req.body.id, req.body, (result) => {
    res.send(result);
  });
};

const GetBranchList = (req, res) => {
  const { perPage, currentPage } = req.query;

  Select(['id', 'title'], table, perPage, currentPage, (result) => {
    res.send(result);
  });
};

module.exports = {
  AddBranch,
  GetBranch,
  DeleteBranch,
  HandleSearch,
  UpdateBranch,
  GetBranchList,
};
