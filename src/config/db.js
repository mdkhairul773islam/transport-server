const environment = process.env.NODE_ENV || 'development';
// const config = require('./knexfile')[environment];
// eslint-disable-next-line import/order
const config = require('../../knexfile')[environment];
const knex = require('knex')(config);
const { attachPaginate } = require('knex-paginate');

attachPaginate();

module.exports = knex;
