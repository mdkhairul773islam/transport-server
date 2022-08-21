/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
const db = require('../config/db');
const dataSelect = require('./DataSelect/Vehicle');
const paginate = require('../utility/paginateQuery');

const Vehicle = {
  Select: (table, tableTo, perPage, currentPage, callBack) => {
    const { perpage, currentpage, offset } = paginate.set({ perPage, currentPage });
    return Promise.all([
      db.count('* as count').from('vehicles').where('vehicles.trash', 0).first(),
      dataSelect.withQuery(
        db
          .from(table)
          .leftJoin(tableTo, 'vehicles.id', 'vehicles_tax_details.vehicles_id')
          .where('vehicles.trash', 0)
          .groupBy('vehicles.id')
          .orderBy('vehicles.id', 'desc')
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
          message: 'Vehicle',
          description: 'Vehicle Read Successfully!',
          type: 'success',
          data: result,
          pagination,
        });
      } catch (err) {
        await callBack({
          status: 403,
          message: 'Vehicle',
          description: err.toString(),
          type: 'error',
        });
      }
    });
  },

  Insert: (table, tableTo, vehicleData, vehicleTxData, callBack) => {
    db(table)
      .insert(vehicleData)
      .then((id) => {
        vehicleTxData.map((row) => {
          const data = db(tableTo)
            .insert({
              vehicles_id: id,
              tax_type: row.tax_type,
              tax_amount: row.tax_amount,
              tax_start_date: row.tax_start_date,
              tax_end_date: row.tax_end_date,
              tax_description: row.tax_description,
              created_at: row.created_at,
            })
            .then();
          return data;
        });
        dataSelect
          .withQuery(
            db
              .from('vehicles')
              .leftJoin('vehicles_tax_details', 'vehicles.id', 'vehicles_tax_details.vehicles_id')
              .where('vehicles.trash', 0)
              .orderBy('vehicles.id', 'desc'),
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

  Update: (table, tableTo, vehiclesData, vehicleTx, id, callBack) => {
    db(table)
      .where('id', id)
      .update(vehiclesData)
      .then(() => {
        if (vehicleTx.length > 0) {
          vehicleTx.map((row) => {
            db(tableTo)
              .where({ vehicles_id: id, id: typeof row.id !== 'undefined' ? row.id : 0 })
              .select('id')
              .first()
              .then((vehicleTxInfo) => {
                if (typeof vehicleTxInfo !== 'undefined' && vehicleTxInfo.id === row.id) {
                  const dataUpdate = db(tableTo)
                    .where({ vehicles_id: id, id: row.id })
                    .update({
                      vehicles_id: id,
                      tax_type: row.tax_type,
                      tax_amount: row.tax_amount,
                      tax_start_date: row.tax_start_date,
                      tax_end_date: row.tax_end_date,
                      tax_description: row.tax_description,
                      created_at: row.created_at,
                      updated_at: row.updated_at,
                    })
                    .then();
                  return dataUpdate;
                }
                const dataInsert = db(tableTo)
                  .insert({
                    vehicles_id: id,
                    tax_type: row.tax_type,
                    tax_amount: row.tax_amount,
                    tax_start_date: row.tax_start_date,
                    tax_end_date: row.tax_end_date,
                    tax_description: row.tax_description,
                    created_at: row.created_at,
                  })
                  .then();
                return dataInsert;
              });
            return row;
          });
          callBack({
            status: 200,
            message: 'Vehicle',
            description: 'Vehicle Read Successfully!',
            type: 'success',
            data: [],
          });
        }
        callBack({
          status: 200,
          message: 'Vehicle',
          description: 'Vehicle Update Successfully!',
          type: 'success',
          data: [],
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

  Delete: (table, tableTo, id, callBack) => {
    db(table)
      .whereIn('id', id.split(','))
      .update('trash', 1)
      .then(() => {
        db(tableTo)
          .whereIn('vehicles_id', id.split(','))
          .update('trash', 1)
          .then(() => {
            dataSelect
              .withQuery(
                db
                  .from('vehicles')
                  .leftJoin('vehicles_tax_details', 'vehicles.id', 'vehicles_tax_details.vehicles_id')
                  .where('vehicles.trash', 0)
                  .orderBy('vehicles.id', 'desc'),
              )
              .then(async (result) => {
                await callBack({
                  status: 200,
                  message: 'Deleted!',
                  description: 'Vehicle Successfully Deleted!',
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
          .from('vehicles')
          .leftJoin('vehicles_tax_details', 'vehicles.id', 'vehicles_tax_details.vehicles_id')
          .where({ 'vehicles.id': id, 'vehicles.trash': 0 }),
      )
      .then(async (result) => {
        try {
          await callBack({
            status: 200,
            message: 'Vehicle',
            description: 'Vehicle Read Successfully!',
            type: 'success',
            data: result,
          });
        } catch (err) {
          await callBack({
            status: 403,
            message: 'Vehicle',
            description: err.toString(),
            type: 'error',
          });
        }
      });
  },

  FilterQuery: (table, data, callBack) => {
    db(table)
      .where('customer_name', 'like', `%${data}%`)
      .then(async (result) => {
        await callBack({
          status: 200,
          message: 'Vehicle',
          description: 'Vehicle Read Successfully!',
          type: 'success',
          data: result,
        });
      });
  },
};

module.exports = Vehicle;
