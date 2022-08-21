const db = require('./db');

const Query = {
  Insert: (table, data, validation, callBack, limit = [1, 10]) => {
    const queryWithExtraArguments = () => {
      const query = `INSERT INTO ${table} (${Object.keys(data).map((item) => item)}) VALUES (${Object.values(data).map((item) => `'${item}'`)})`;

      db.query(query, (err) => {
        if (!err) {
          db.query(`Select * from ${table} Limit ${limit[0]}, ${limit[1]}`, (_, rows) => {
            callBack({
              status: 200,
              message: 'Record has been submitted successfully!',
              type: 'success',
              data: rows,
            });
          });
        } else {
          callBack({
            status: 500,
            message: 'Record Submit failed! Please check your connection',
            type: 'error',
          });
        }
      });
    };

    if (validation.isExist !== undefined) {
      const { isExist } = validation;
      db.query(`Select * from ${table} WHERE ${isExist.where} Limit 10`, (err, rows) => {
        if (rows && rows.length) {
          callBack({
            status: 500,
            message: `${isExist.filed} Already Exist! Please type another valid ${isExist.filed}.`,
            type: 'error',
          });
        } else {
          queryWithExtraArguments();
        }
      });
    } else {
      queryWithExtraArguments();
    }
  },
  Select: (data, table, condition, callBack, limit = [0, 10]) => {
    if (condition.where !== undefined) {
      db.query(`Select ${data} from ${table} WHERE ${condition.where} Limit ${limit[0]}, ${limit[1]}`, async (err, rows) => {
        if (!err) {
          await callBack({
            status: 200,
            message: 'Your All Records successfully read!',
            type: 'success',
            data: rows,
          });
        } else {
          console.log(err);
          await callBack({
            status: 500,
            message: 'Your Records reading failed!',
            type: 'error',
          });
        }
      });
    } else {
      db.query(`Select ${data} from ${table} Limit ${limit[0]}, ${limit[1]}`, async (err, rows) => {
        if (!err) {
          await callBack({
            status: 200,
            message: 'Your All Records successfully read!',
            type: 'success',
            data: rows,
          });
        } else {
          console.log(err);
          await callBack({
            status: 500,
            message: 'Your Records reading failed!',
            type: 'error',
          });
        }
      });
    }
  },
  Update: (table, condition, callBack) => {
    db.query(`UPDATE ${table} SET ${condition.set} WHERE ${condition.where}`, async (err) => {
      if (!err) {
        db.query(`Select * from ${table}`, (_, rows) => {
          callBack({
            status: 200,
            message: 'Your Record has been successfully updated!',
            type: 'success',
            data: rows,
          });
        });
      } else {
        await callBack({
          status: 500,
          message: 'Your Record Updating failed!',
          type: 'error',
        });
      }
    });
  },
  Delete: (table, condition, callBack) => {
    db.query(`DELETE FROM ${table} WHERE ${condition.where}`, async (err) => {
      if (!err) {
        db.query(`Select * from ${table}`, (_, rows) => {
          callBack({
            status: 200,
            message: 'Your Record has been successfully Deleted!',
            type: 'success',
            data: rows,
          });
        });
      } else {
        await callBack({
          status: 500,
          message: 'Your Record Delete failed!',
          type: 'error',
        });
      }
    });
  },

  InnerJoin: (data, table1, table2, condition, callBack) => {
    const dataQuery = `Select ${data}  from ${table1} INNER JOIN ${table2} ON ${condition.where}`;

    db.query(dataQuery, async (err, rows) => {
      if (!err) {
        await callBack({
          status: 200,
          message: 'Your All Records successfully read!',
          type: 'success',
          data: rows,
        });
      } else {
        await callBack({
          status: 500,
          message: 'Your Records reading failed!',
          type: 'error',
        });
      }
    });
  },
};

module.exports = Query;
