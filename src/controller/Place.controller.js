const {
  Insert, Select, Delete, FilterQuery, Update,
} = require('../model/Place.model');

const table = 'places';

const AddPlace = (req, res) => {
  Insert(table, req.body, (result) => res.send(result));
};

const GetPlace = (req, res) => {
  const { perPage, currentPage } = req.query;
  Select('*', table, perPage, currentPage, (result) => {
    res.send(result);
  });
};

const DeletePlace = (req, res) => {
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

const UpdatePlace = (req, res) => {
  Update(table, req.body.id, req.body, (result) => {
    res.send(result);
  });
};

module.exports = {
  AddPlace, GetPlace, DeletePlace, HandleSearch, UpdatePlace,
};
