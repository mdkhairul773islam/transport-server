const db = require('../config/db');

const VehicleType = {
  Select: (data, table, perPage, currentPage, callBack) => {
    db(table).where('trash', 0).select(data)
      .paginate({ perPage, currentPage, isLengthAware: true })
      .then(async (result) => {
        try {
          await callBack({
            status: 200,
            message: 'Vehicle Type',
            description: 'Vehicle Type Successfully!',
            type: 'success',
            data: result,
          });
        } catch (err) {
          await callBack({
            status: 403,
            message: 'Vehicle Type',
            description: err.toString(),
            type: 'error',
          });
        }
      });
  },
  Insert: (table, data, callBack) => {
    db(table).insert(data).then(() => {
      db(table).where('trash', 0).select('*').then(async (result) => {
        await callBack({
          status: 200,
          message: 'Vehicle Type',
          description: 'Vehicle Type Successfully!',
          type: 'success',
          data: result,
        });
      });
    }).catch((err) => callBack({
      status: 500,
      message: 'Vehicle Type!',
      description: err.toString(),
      type: 'error',
    }));
  },

  Delete: (table, id, callBack) => {
    db(table).whereIn('id', id.split(',')).update({ trash: 1 }).then(() => {
      db(table).where('trash', 0).select('*').then(async (result) => {
        await callBack({
          status: 200,
          message: 'Deleted!',
          description: 'Vehicle Type Successfully Deleted!',
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
    db(table).where('trash', 0).andWhere('vehicle_type', 'like', `%${data}%`).then(async (result) => {
      await callBack({
        status: 200,
        message: 'Vehicle Type',
        description: 'Vehicle Type Successfully!',
        type: 'success',
        data: result,
      });
    });
  },
  SingleVehicleType: (table, id, callBack) => {
    db(table).where('id', id).select('*')
      .then(async (result) => {
        await callBack({
          status: 200,
          message: 'Updated!',
          description: 'Vehicle Type successfully updated!',
          type: 'success',
          data: result,
        });
      })
      .catch((err) => callBack({
        status: 500,
        message: 'Updated!',
        description: err.toString(),
        type: 'error',
      }));
  },
  Update: (table, id, data, callBack) => {
    db(table).where('id', id).update(data).then(() => {
      db(table).where('trash', 0).select('*').then(async (result) => {
        await callBack({
          status: 200,
          message: 'Updated!',
          description: 'Vehicle Type successfully updated!',
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

module.exports = VehicleType;
