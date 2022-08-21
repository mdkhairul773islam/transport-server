/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
const db = require('../config/db');
const dataSelect = require('./DataSelect/Customer');
const paginate = require('../utility/paginateQuery');

const Customer = {
  Select: (table, tableTo, perPage, currentPage, callBack) => {
    const { perpage, currentpage, offset } = paginate.set({ perPage, currentPage });
    return Promise.all([
      db.count('* as count').from('customers').where('customers.trash', 0).first(),
      dataSelect.withQuery(
        db
          .from(table)
          .leftJoin(tableTo, 'customers.id', 'customer_references.customers_id')
          .where('customers.trash', 0)
          .groupBy('customers.id')
          .orderBy('customers.id', 'desc')
          .offset(offset)
          .limit(perpage),
      ),
    ]).then(async ([total, result]) => {
      const pagination = paginate.get({
        perpage,
        currentpage,
        offset,
        total,
        result,
      });

      try {
        await callBack({
          status: 200,
          message: 'Customer',
          description: 'Customers Read Successfully!',
          type: 'success',
          data: result,
          pagination,
        });
      } catch (err) {
        await callBack({
          status: 403,
          message: 'Customer',
          description: err.toString(),
          type: 'error',
        });
      }
    });
  },

  Insert: (table, tableTo, customers, customerReferences, callBack) => {
    db(table)
      .insert(customers)
      .then((id) => {
        customerReferences.map((row) => {
          const data = db(tableTo)
            .insert({
              customers_id: id,
              name: row.name,
              address: row.address,
              designation: row.designation,
              mobile: row.mobile,
              email: row.email,
              created_at: row.created_at,
            })
            .then();
          return data;
        });
        dataSelect
          .withQuery(
            db
              .from('customers')
              .leftJoin('customer_references', 'customers.id', 'customer_references.customers_id')
              .where('customers.trash', 0)
              .orderBy('customers.id', 'desc'),
          )
          .then(async (result) => {
            await callBack({
              status: 200,
              message: 'Get Last ID',
              description: 'ID Return Successfully!',
              type: 'success',
              data: result,
            });
          });
      })
      .catch((err) =>
        callBack({
          status: 500,
          message: 'Customer Add!',
          description: err.toString(),
          type: 'error',
        }),
      );
  },

  Delete: (table, tableTo, id, callBack) => {
    db(table)
      .whereIn('id', id.split(','))
      .update('trash', 1)
      .then(() => {
        db(tableTo)
          .whereIn('customers_id', id.split(','))
          .update('trash', 1)
          .then(() => {
            dataSelect
              .withQuery(
                db
                  .from('customers')
                  .leftJoin('customer_references', 'customers.id', 'customer_references.customers_id')
                  .where('customers.trash', 0)
                  .orderBy('customers.id', 'desc'),
              )
              .then(async (result) => {
                await callBack({
                  status: 200,
                  message: 'Deleted!',
                  description: 'Customer Successfully Deleted!',
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

  SelectSingle: (id, callBack) => {
    dataSelect
      .withQuery(
        db
          .from('customers')
          .leftJoin('customer_references', 'customers.id', 'customer_references.customers_id')
          .where({ 'customers.id': id, 'customers.trash': 0 }),
      )
      .then(async (result) => {
        try {
          await callBack({
            status: 200,
            message: 'Customer',
            description: 'Customer Read Successfully!',
            type: 'success',
            data: result,
          });
        } catch (err) {
          await callBack({
            status: 403,
            message: 'Customer',
            description: err.toString(),
            type: 'error',
          });
        }
      });
  },

  FilterQuery: (table, data, callBack) => {
    db(table)
      .where('trash', 0)
      .where('customer_name', 'like', `%${data}%`)
      .then(async (result) => {
        await callBack({
          status: 200,
          message: 'Customer',
          description: 'Customers Read Successfully!',
          type: 'success',
          data: result,
        });
      });
  },
  Update: (table, tableTo, customersData, customerReferencesData, id, callBack) => {
    db(table)
      .where('id', id)
      .update(customersData)
      .then(() => {
        if (customerReferencesData.length) {
          customerReferencesData.map((row) => {
            db(tableTo)
              .where({ customers_id: id, id: typeof row.id !== 'undefined' ? row.id : 0 })
              .select('id')
              .first()
              .then((customerRef) => {
                if (typeof customerRef !== 'undefined' && customerRef.id === row.id) {
                  const data = db(tableTo)
                    .where({ customers_id: id, id: row.id })
                    .update({
                      customers_id: id,
                      name: row.name,
                      address: row.address,
                      designation: row.designation,
                      mobile: row.mobile,
                      email: row.mobile,
                      created_at: row.created_at,
                      updated_at: row.updated_at,
                    })
                    .then(() => {});
                  return data;
                }
                const data = db(tableTo)
                  .insert({
                    customers_id: id,
                    name: row.name,
                    address: row.address,
                    designation: row.designation,
                    mobile: row.mobile,
                    email: row.mobile,
                    created_at: row.created_at,
                  })
                  .then(() => {
                    dataSelect
                      .withQuery(
                        db
                          .from(table)
                          .leftJoin(tableTo, 'customers.id', 'customer_references.customers_id')
                          .where('customers.trash', 0)
                          .orderBy('customers.id', 'desc'),
                      )
                      .then(() => {});
                  });
                return data;
              });
            return row;
          });
          callBack({
            status: 200,
            message: 'Customer',
            description: 'Customers Read Successfully!',
            type: 'success',
            data: [],
          });
        } else {
          callBack({
            status: 200,
            message: 'Customer',
            description: 'Customers Update Successfully!',
            type: 'success',
            data: [],
          });
        }
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
};

module.exports = Customer;
