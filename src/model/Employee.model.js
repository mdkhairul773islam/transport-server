const db = require('../config/db');

const Employee = {
  Select: (data, table, perPage, currentPage, callBack) => {
    db(table)
      .where('trash', 0)
      .select(data)
      .paginate({ perPage, currentPage, isLengthAware: true })
      .then(async (result) => {
        try {
          await callBack({
            status: 200,
            message: 'Employee',
            description: 'Employee Read Successfully!',
            type: 'success',
            data: result.data,
            pagination: result.pagination,
          });
        } catch (err) {
          await callBack({
            status: 403,
            message: 'Employee',
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
              message: 'Employee',
              description: 'Employee Read Successfully!',
              type: 'success',
              data: result,
            });
          });
      })
      .catch((err) =>
        callBack({
          status: 500,
          message: 'Employee Added!',
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
      .where('name', 'like', `%${data}%`)
      .then(async (result) => {
        await callBack({
          status: 200,
          message: 'Employee',
          description: 'Employee Read Successfully!',
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
              description: 'Employee successfully updated!',
              type: 'success',
              data: result,
            });
          });
      })
      .catch((err) =>
        callBack({
          status: 500,
          message: 'Updated!',
          description: err.toString(),
          type: 'error',
        }),
      );
  },
  SelectSingle: (data, table, id, callBack) => {
    db(table)
      .select(data)
      .where('id', id)
      .then(async (result) => {
        try {
          await callBack({
            status: 200,
            message: 'Employee',
            description: 'Employee Read Successfully!',
            type: 'success',
            data: result,
          });
        } catch (err) {
          await callBack({
            status: 403,
            message: 'Employee',
            description: err.toString(),
            type: 'error',
          });
        }
      });
  },
};

module.exports = Employee;
