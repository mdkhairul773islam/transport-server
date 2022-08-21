/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
const db = require('../config/db');
const dataSelect = require('./DataSelect/Suplier');
const paginate = require('../utility/paginateQuery');

const Suplier = {
  Select: (table, tableTo, perPage, currentPage, callBack) => {
    const { perpage, currentpage, offset } = paginate.set({ perPage, currentPage });
    return Promise.all([
      db.count('* as count').from('suppliers').where('suppliers.trash', 0).first(),
      dataSelect.withQuery(
        db
          .from(table)
          .leftJoin(tableTo, 'suppliers.id', 'suppliers_contact_person_details.suppliers_id')
          .where('suppliers.trash', 0)
          .groupBy('suppliers.id')
          .orderBy('suppliers.id', 'desc')
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
          description: 'Supplier Read Successfully!',
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

  Insert: (table, tableTo, suppliersData, suplierDetailsData, callBack) => {
    db(table)
      .insert(suppliersData)
      .then((id) => {
        suplierDetailsData.map((row) => {
          const data = db(tableTo)
            .insert({
              suppliers_id: id,
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
              .from('suppliers')
              .leftJoin(
                'suppliers_contact_person_details',
                'suppliers.id',
                'suppliers_contact_person_details.suppliers_id',
              )
              .where('suppliers.trash', 0)
              .orderBy('suppliers.id', 'desc'),
          )
          .then(async (result) => {
            await callBack({
              status: 200,
              message: 'Supplier',
              description: 'Supplier Return Successfully!',
              type: 'success',
              data: result,
            });
          });
      })
      .catch((err) =>
        callBack({
          status: 500,
          message: 'Suplier Add!',
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
          .whereIn('suppliers_id', id.split(','))
          .update('trash', 1)
          .then(() => {
            dataSelect
              .withQuery(
                db
                  .from('suppliers')
                  .leftJoin(
                    'suppliers_contact_person_details',
                    'suppliers.id',
                    'suppliers_contact_person_details.suppliers_id',
                  )
                  .where('suppliers.trash', 0)
                  .orderBy('suppliers.id', 'desc'),
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
          .from('suppliers')
          .leftJoin('suppliers_contact_person_details', 'suppliers.id', 'suppliers_contact_person_details.suppliers_id')
          .where({ 'suppliers.id': id, 'suppliers.trash': 0 }),
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
          message: 'Suplier',
          description: 'Supplier Read Successfully!',
          type: 'success',
          data: result,
        });
      });
  },
  Update: (table, tableTo, suppliersData, suplierDetailsData, id, callBack) => {
    db(table)
      .where('id', id)
      .update(suppliersData)
      .then(() => {
        if (suplierDetailsData.length) {
          suplierDetailsData.map((row) => {
            db(tableTo)
              .where({ suppliers_id: id, id: typeof row.id !== 'undefined' ? row.id : 0 })
              .select('id')
              .first()
              .then((customerRef) => {
                if (typeof customerRef !== 'undefined' && customerRef.id === row.id) {
                  const data = db(tableTo)
                    .where({ suppliers_id: id, id: row.id })
                    .update({
                      suppliers_id: id,
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
                    suppliers_id: id,
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
                          .leftJoin(tableTo, 'suppliers.id', 'suppliers_contact_person_details.suppliers_id')
                          .where('suppliers.trash', 0)
                          .orderBy('suppliers.id', 'desc'),
                      )
                      .then(() => {});
                  });
                return data;
              });
            return row;
          });
          callBack({
            status: 200,
            message: 'Suplier',
            description: 'Suplier Read Successfully!',
            type: 'success',
            data: [],
          });
        } else {
          callBack({
            status: 200,
            message: 'Suplier',
            description: 'Suplier Update Successfully!',
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

module.exports = Suplier;
