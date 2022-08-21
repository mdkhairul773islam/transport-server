const db = require('../config/db');

const Bank = {
  Select: (data, table, perPage, currentPage, callBack) => {
    db(table)
      .where('trash', 0)
      .select(data)
      .paginate({ perPage, currentPage, isLengthAware: true })
      .then(async (result) => {
        try {
          await callBack({
            status: 200,
            message: 'Bank',
            description: 'Bank Read Successfully!',
            type: 'success',
            data: result.data,
            pagination: result.pagination,
          });
        } catch (err) {
          await callBack({
            status: 403,
            message: 'Bank',
            description: err.toString(),
            type: 'error',
          });
        }
      });
  },
  List: (data, table, callBack) => {
    db(table)
      .where('trash', 0)
      .select(data)
      .then(async (result) => {
        try {
          await callBack({
            status: 200,
            message: 'Bank',
            description: 'Bank List Read Successfully!',
            type: 'success',
            data: result,
          });
        } catch (err) {
          await callBack({
            status: 403,
            message: 'Bank',
            description: err.toString(),
            type: 'error',
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
            await callBack({
              status: 200,
              message: 'Bank',
              description: 'Bank Read Successfully!',
              type: 'success',
              data: result,
            });
          });
      })
      .catch((err) => callBack({
        status: 500,
        message: 'Bank Added!',
        description: err.toString(),
        type: 'error',
      }));
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
              description: 'Bank Successfully Deleted!',
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
  FilterQuery: (table, data, callBack) => {
    db(table)
      .where('trash', 0)
      .andWhere('bank_name', 'like', `%${data}%`)
      .then(async (result) => {
        await callBack({
          status: 200,
          message: 'Bank',
          description: 'Bank Read Successfully!',
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
            await callBack({
              status: 200,
              message: 'Updated!',
              description: 'Bank successfully updated!',
              type: 'success',
              data: result,
            });
          });
      })
      .catch((err) => callBack({
        status: 500,
        message: 'Updated!',
        description: err.toString(),
        type: 'error',
      }));
  },
};

module.exports = Bank;
