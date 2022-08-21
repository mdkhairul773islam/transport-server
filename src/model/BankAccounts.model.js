const db = require('../config/db');

const BankAccounts = {

  Select: (data, table, tableTo, perPage, currentPage, callBack) => {
    db(table).where(`${table}.trash`, 0)
      .join(tableTo, `${table}.banks_id`, '=', `${tableTo}.id`)
      .select(data)
      .paginate({ perPage, currentPage, isLengthAware: true })
      .then(async (result) => {
        try {
          await callBack({
            status: 200,
            message: 'Bank Account',
            description: 'Bank Account Read Successfully!',
            type: 'success',
            data: result.data,
          });
        } catch (err) {
          await callBack({
            status: 403,
            message: 'Bank Account',
            description: err.toString(),
            type: 'error',
          });
        }
      });
  },
  Insert: (table, data, tableTo, callBack) => {
    db(table)
      .insert(data)
      .then(() => {
        db(table).where(`${table}.trash`, 0)
          .join(tableTo, `${table}.banks_id`, '=', `${tableTo}.id`)
          .select(['bank_accounts.*', 'banks.bank_name', 'banks.branch_name'])
          .then(async (result) => {
            try {
              await callBack({
                status: 200,
                message: 'Bank Account',
                description: 'Bank Account Read Successfully!',
                type: 'success',
                data: result,
              });
            } catch (err) {
              await callBack({
                status: 403,
                message: 'Bank Account',
                description: err.toString(),
                type: 'error',
              });
            }
          });
      })
      .catch((err) => callBack({
        status: 500,
        message: 'Bank Account Added!',
        description: err.toString(),
        type: 'error',
      }));
  },
  FilterQuery: (table, data, callBack) => {
    db(table).where('trash', 0)
      .andWhere('account_holder', 'like', `%${data}%`).orWhere('account_no', 'like', `%${data}%`)
      .then(async (result) => {
        await callBack({
          status: 200,
          message: 'Bank Account',
          description: 'Bank Account Read Successfully!',
          type: 'success',
          data: result,
        });
      });
  },
  Update: (table, id, data, tableTo, callBack) => {
    db(table)
      .where('id', id)
      .update(data)
      .then(() => {
        db(table).where(`${table}.trash`, 0)
          .join(tableTo, `${table}.banks_id`, '=', `${tableTo}.id`)
          .select(['bank_accounts.*', 'banks.bank_name', 'banks.branch_name'])
          .then(async (result) => {
            try {
              await callBack({
                status: 200,
                message: 'Bank Account',
                description: 'Bank Account Read Successfully!',
                type: 'success',
                data: result,
              });
            } catch (err) {
              await callBack({
                status: 403,
                message: 'Bank Account',
                description: err.toString(),
                type: 'error',
              });
            }
          });
      })
      .catch((err) => callBack({
        status: 500,
        message: 'Updated!',
        description: err.toString(),
        type: 'error',
      }));
  },

  Delete: (table, id, tableTo, callBack) => {
    const perPage = 10;
    const currentPage = 1;
    db(table)
      .whereIn('id', id.split(','))
      .update({ trash: 1 })
      .then(() => {
        db(table).where(`${table}.trash`, 0)
          .join(tableTo, `${table}.banks_id`, '=', `${tableTo}.id`)
          .select(['bank_accounts.*', 'banks.bank_name', 'banks.branch_name'])
          .paginate({ perPage, currentPage, isLengthAware: true })
          .then(async (result) => {
            try {
              await callBack({
                status: 200,
                message: 'Bank Account',
                description: 'Bank Account Read Successfully!',
                type: 'success',
                data: result.data,
              });
            } catch (err) {
              await callBack({
                status: 403,
                message: 'Bank Account',
                description: err.toString(),
                type: 'error',
              });
            }
          });
      })
      .catch((err) => callBack({
        status: 500,
        message: 'Delete!',
        description: err.toString(),
        type: 'error',
      }));
  },
}; 

module.exports = BankAccounts;
