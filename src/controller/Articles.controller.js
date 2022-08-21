const {
  Insert, Select, Delete, FilterQuery, Update,
} = require('../model/Articles.model');

const table = 'articles';

const AddArticle = (req, res) => {
  Insert(table, req.body, (result) => res.send(result));
};

const GetArticle = (req, res) => {
  const { perPage, currentPage } = req.query;
  Select('*', table, perPage, currentPage, (result) => {
    res.send(result);
  });
};

const DeleteArticle = (req, res) => {
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

const UpdateArticle = (req, res) => {
  Update(table, req.body.id, req.body, (result) => {
    res.send(result);
  });
};

module.exports = {
  AddArticle,
  GetArticle,
  DeleteArticle,
  HandleSearch,
  UpdateArticle,
};
