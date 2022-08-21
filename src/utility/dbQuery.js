const db = require('../config/db');

const dbQuery = {
  Read(table, data) {
    return db(table).where('trash', 0).select(data);
  },
  Insert(table, data) {
    return db(table).insert(data);
  },
  Update(table, data, where = {}) {
    return db(table).where(where).update(data);
  },
  LikeFilter(table, column, data) {
    return db(table).where('trash', 0).where(column, 'like', `%${data}%`);
  },
  Trash(table, data, where = {}) {
    return db(table).where(where).update(data);
  },
  Delete(table, where = {}) {
    return db(table).where(where).del();
  },
  SingleData(data, table, where = {}) {
    return db(table).select(data).where(where);
  },
  Join(tableFrom, tableTo, where) {
    return db(tableFrom).join(tableTo, where);
  },
};
module.exports = dbQuery;
