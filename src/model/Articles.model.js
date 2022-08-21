/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
const db = require('../config/db');

const Articles = {
  Select: (data, table, perPage, currentPage, callBack) => {
    db(table)
      .where('trash', 0)
      .select(data)
      .paginate({ perPage, currentPage, isLengthAware: true })
      .then(async (result) => {
        try {
          await callBack({
            status: 200,
            message: 'Articles',
            description: 'Articles Read Successfully!',
            type: 'success',
            data: result.data,
            pagination: result.pagination,
          });
        } catch (err) {
          await callBack({
            status: 200,
            message: 'Articles',
            description: err.toString(),
            type: 'error',
            data: [],
          });
        }
      });
  },
  Insert: (table, data, callBack) => {
    db(table)
      .insert(data)
      .then(() => {
        db(table)
          .where('trash', 0)
          .select('*')
          .then(async (result) => {
            if (result.length) {
              await callBack({
                status: 200,
                message: 'Articles',
                description: 'Articles Read Successfully!',
                type: 'success',
                data: result,
              });
            }
          });
      })
      .catch((err) =>
        callBack({
          status: 500,
          message: 'Article Added!',
          description: err.toString(),
          type: 'error',
        }),
      );
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
              description: 'Article Successfully Deleted!',
              type: 'success',
              data: result,
            });
          });
      })
      .catch((err) =>
        callBack({
          status: 500,
          message: 'Deleted!',
          description: err.toString(),
          type: 'error',
        }),
      );
  },
  FilterQuery: (table, data, callBack) => {
    db(table)
      .where('trash', 0)
      .andWhere('title', 'like', `%${data}%`)
      .then(async (result) => {
        await callBack({
          status: 200,
          message: 'Articles',
          description: 'Articles Read Successfully!',
          type: 'success',
          data: result,
        });
      });
  },
  Update: (table, id, data, callBack) => {
    db(table)
      .where('id', id)
      .update(data)
      .then(() => {
        db(table)
          .where('trash', 0)
          .select('*')
          .then(async (result) => {
            if (result.length) {
              await callBack({
                status: 200,
                message: 'Updated!',
                description: 'Article successfully updated!',
                type: 'success',
                data: result,
              });
            }
          });
      })
      .catch(async (err) => {
        await callBack({
          status: 500,
          message: 'Updated!',
          description: err.toString(),
          type: 'error',
        });
      });
  },
};

module.exports = Articles;
