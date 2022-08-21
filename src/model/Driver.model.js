const db = require('../config/db');
/* eslint-disable object-curly-newline */
const { Read, Insert, Update, LikeFilter, SingleData } = require('../utility/dbQuery');

const Driver = {
  Select: (data, table, perPage, currentPage, callBack) => {
    Read(table, data)
      .paginate({ perPage, currentPage, isLengthAware: true })
      .then(async (result) => {
        try {
          await callBack({
            status: 200,
            message: 'Driver',
            description: 'Driver Read Successfully!',
            type: 'success',
            data: result.data,
            pagination: result.pagination,
          });
        } catch (err) {
          await callBack({
            status: 403,
            message: 'Driver',
            description: err.toString(),
            type: 'error',
          });
        }
      });
  },  
  Insert: (table, data, callBack) => {
    Insert(table, data).then(async () => {
      try {
        await callBack({
          status: 200,
          message: 'Driver',
          description: 'Driver Add Successfully!',
          type: 'success',
          data: [],
        });
      } catch (err) {
        await callBack({
          status: 403,
          message: 'Driver Added Error',
          description: err.toString(),
          type: 'error',
        });
      }
    });
  },

  Delete: (table, id, callBack) => {
    db(table)
      .whereIn('id', id.split(','))
      .update({ trash: 1 })
      .then(() => {
        db(table)
          .where('trash', 0)
          .select('*')
          .then(async (result) => {
            await callBack({
              status: 200,
              message: 'Deleted!',
              description: 'Driver Successfully Deleted!',
              type: 'success',
              data: result,
            });
          });
      })
      .catch((err) => callBack({
        status: 500,
        message: 'Deleted!',
        description: err.toString(),
        type: 'error',
      }));
  },

  FilterQuery: (table, column, data, callBack) => {
    LikeFilter(table, column, data).then(async (result) => {
      await callBack({
        status: 200,
        message: 'Driver',
        description: 'Driver Read Successfully!',
        type: 'success',
        data: result,
      });
    });
  },
  Update: (table, id, data, callBack) => {
    Update(table, data, { id }).then(async () => {
      try {
        await callBack({
          status: 200,
          message: 'Updated!',
          description: 'Driver successfully updated!',
          type: 'success',
          data: [],
        });
      } catch (err) {
        await callBack({
          status: 403,
          message: 'Driver Update Error',
          description: err.toString(),
          type: 'error',
        });
      }
    });
  },
  SingleData: (table, data, id, callBack) => {
    SingleData(table, data, { id }).then(async (result) => {
      try {
        await callBack({
          status: 200,
          message: 'Deleted!',
          description: 'Driver Successfully Deleted!',
          type: 'success',
          data: result,
        });
      } catch (err) {
        await callBack({
          status: 403,
          message: 'Driver Deleted Error',
          description: err.toString(),
          type: 'error',
        });
      }
    });
  },
};

module.exports = Driver;
