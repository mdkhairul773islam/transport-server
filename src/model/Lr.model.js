/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
const db = require('../config/db');
const dataSelect = require('./DataSelect/Lr');
const invoiceDataSelect = require('./DataSelect/Lrinvoice');
const paginate = require('../utility/paginateQuery');

const Lr = {
  Select: (perPage, currentPage, callBack) => {
    const { perpage, currentpage, offset } = paginate.set({ perPage, currentPage });
    return Promise.all([
      db.count('* as count').from('lorry_receipts').where('lorry_receipts.trash', 0).first(),
      dataSelect.withQuery(
        db
          .from('lorry_receipts')

          .leftJoin('lorry_transactions', 'lorry_receipts.id', 'lorry_transactions.lorry_id')
          .leftJoin('lorry_billings', 'lorry_receipts.id', 'lorry_billings.lorry_id')
          .leftJoin('lorry_freights', 'lorry_receipts.id', 'lorry_freights.lorry_id')
          .where('lorry_receipts.trash', 0)
          .groupBy('lorry_receipts.id')
          .orderBy('lorry_receipts.id', 'desc')
          .offset(offset)
          .limit(perpage),
      ),
    ]).then(async ([total, result]) => {
      const pagination = await paginate.get({
        perpage,
        currentpage,
        offset,
        total,
        result,
      });
      try {
        await callBack({
          status: 200,
          message: 'Lr',
          description: 'Lr Read Successfully!',
          type: 'success',
          data: result,
          pagination,
        });
      } catch (err) {
        await callBack({
          status: 403,
          message: 'Lr',
          description: err.toString(),
          type: 'error',
        });
      }
    });
  },

  Insert: (
    tableLr,
    tableLt,
    tableBill,
    tableFreight,
    lorryReceiptData,
    lorryTransactionData,
    lorryBillingData,
    lorryFreightData,
    callBack,
  ) => {
    db(tableLr)
      .insert(lorryReceiptData)
      .then(async (id) => {
        const lorryFreightDataID = { ...lorryBillingData, lorry_id: id };
        const lorryBillingDataID = { ...lorryFreightData, lorry_id: id };

        Promise.all([
          await lorryTransactionData.map((row) => {
            const data = db(tableLt)
              .insert({
                lorry_id: id,
                articale_id: row.articale_id,
                no_of_article: row.no_of_article,
                description: row.description,
                weight: row.weight,
                rate_per: row.rate_per,
                rate: row.rate,
                freight: row.freight,
                total_no_article: row.total_no_article,
                total_weight: row.total_weight,
                created_at: row.created_at,
              })
              .then();
            return data;
          }),
          await db(tableBill).insert(lorryBillingDataID).then(),
          await db(tableFreight).insert(lorryFreightDataID).then(),
        ])
          .then(async () => {
            const perPage = 10;
            const currentPage = 1;
            const { perpage, currentpage, offset } = paginate.set({ perPage, currentPage });
            return Promise.all([
              db.count('* as count').from('lorry_receipts').where('lorry_receipts.trash', 0).first(),
              dataSelect.withQuery(
                db
                  .from('lorry_receipts')
                  .leftJoin('lorry_billings', 'lorry_receipts.id', 'lorry_billings.lorry_id')
                  .leftJoin('lorry_freights', 'lorry_receipts.id', 'lorry_freights.lorry_id')
                  .leftJoin('lorry_transactions', 'lorry_receipts.id', 'lorry_transactions.lorry_id')
                  .where('lorry_receipts.trash', 0)
                  .groupBy('lorry_receipts.id')
                  .orderBy('lorry_receipts.id', 'desc')
                  .offset(offset)
                  .limit(20), // perpage
              ),
            ]).then(async ([total, result]) => {
              try {
                const pagination = paginate.get({
                  perpage,
                  currentpage,
                  offset,
                  total,
                  result,
                });
                await callBack({
                  status: 200,
                  message: 'Lr',
                  description: 'Lr Read Successfully!',
                  type: 'success',
                  data: result,
                  pagination,
                });
              } catch (err) {
                await callBack({
                  status: 403,
                  message: 'Lr',
                  description: err.toString(),
                  type: 'error',
                });
              }
            });
          })
          .catch(
            (err) => {
              console.log(err);
              callBack({
                status: 500,
                message: 'Lr Add!',
                description: err.toString(),
                type: 'error',
              });
            });
      })
      .catch(
        (err) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          callBack({
            status: 500,
            message: 'Customer Add!',
            description: err.toString(),
            type: 'error',
          }),
        // eslint-disable-next-line function-paren-newline
      );
  },

  Update: (
    tableLr,
    tableLt,
    tableBill,
    tableFreight,
    lorryReceiptData,
    lorryTransactionData,
    lorryBillingData,
    lorryFreightData,
    id,
    callBack,
  ) => {
    db(tableLr)
      .where('id', id)
      .update(lorryReceiptData)
      .then(async () => {
        if (lorryTransactionData.length > 0) {
          await lorryTransactionData.map((row) => {
            db(tableLt)
              .where({ lorry_id: id, id: typeof row.id !== 'undefined' ? row.id : 0 })
              .select('id')
              .first()
              .then((lorryTransactionInfo) => {
                if (typeof lorryTransactionInfo !== 'undefined' && lorryTransactionInfo.id === row.id) {
                  const dataUpdate = db(tableLt)
                    .where({ lorry_id: id, id: row.id })
                    .update({
                      lorry_id: row.lorry_id,
                      articale_id: row.articale_id,
                      tax_amount: row.tax_amount,
                      no_of_article: row.no_of_article,
                      description: row.description,
                      weight: row.weight,
                      rate_per: row.rate_per,
                      rate: row.rate,
                      freight: row.freight,
                      total_no_article: row.total_no_article,
                      total_weight: row.total_weight,
                      created_at: row.created_at,
                      updated_at: row.updated_at,
                    })
                    .then();
                  return dataUpdate;
                }
                const dataInsert = db(tableLt)
                  .insert({
                    lorry_id: row.lorry_id,
                    articale_id: row.articale_id,
                    tax_amount: row.tax_amount,
                    no_of_article: row.no_of_article,
                    description: row.description,
                    weight: row.weight,
                    rate_per: row.rate_per,
                    rate: row.rate,
                    freight: row.freight,
                    total_no_article: row.total_no_article,
                    total_weight: row.total_weight,
                    created_at: row.created_at,
                  })
                  .then();
                return dataInsert;
              });
            return row;
          });
          callBack({
            status: 200,
            message: 'Lr',
            description: 'Lr Read Successfully!',
            type: 'success',
            data: [],
          });
        }
        await db(tableBill).where('lorry_id', id).update(lorryBillingData).then();
        await db(tableFreight).where('lorry_id', id).update(lorryFreightData).then();
        callBack({
          status: 200,
          message: 'Lr',
          description: 'Lr Update Successfully!',
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

  Delete: (tableLr, tableLt, tableBill, tableFreight, id, callBack) => {
    Promise.all([
      db(tableLr).whereIn('id', id.split(',')).update('trash', 1).then(),
      db(tableLt).whereIn('lorry_id', id.split(',')).update('trash', 1).then(),

      db(tableBill).whereIn('lorry_id', id.split(',')).update('trash', 1).then(),

      db(tableFreight).whereIn('lorry_id', id.split(',')).update('trash', 1).then(),
    ])
      .then(async () => {
        const perPage = 10;
        const currentPage = 1;
        const { perpage, currentpage, offset } = paginate.set({ perPage, currentPage });
        return Promise.all([
          db.count('* as count').from('lorry_receipts').where('lorry_receipts.trash', 0).first(),
          dataSelect.withQuery(
            db
              .from('lorry_receipts')
              .leftJoin('lorry_billings', 'lorry_receipts.id', 'lorry_billings.lorry_id')
              .leftJoin('lorry_freights', 'lorry_receipts.id', 'lorry_freights.lorry_id')
              .leftJoin('lorry_transactions', 'lorry_receipts.id', 'lorry_transactions.lorry_id')
              .where('lorry_receipts.trash', 0)
              .orderBy('lorry_receipts.id', 'desc')
              .offset(offset)
              .limit(20), // perpage
          ),
        ]).then(async ([total, result]) => {
          try {
            const pagination = paginate.get({
              perpage,
              currentpage,
              offset,
              total,
              result,
            });
            await callBack({
              status: 200,
              message: 'Lr',
              description: 'Lr Read Successfully!',
              type: 'success',
              data: result,
              pagination,
            });
          } catch (err) {
            await callBack({
              status: 403,
              message: 'Lr',
              description: err.toString(),
              type: 'error',
            });
          }
        });
      })
      .catch(
        (err) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          callBack({
            status: 500,
            message: 'Lr Delete!',
            description: err.toString(),
            type: 'error',
          }),
        // eslint-disable-next-line function-paren-newline
      );
  },

  SelectSingle: (id, callBack) => {
    invoiceDataSelect
      .withQuery(
        db
          .from('lorry_receipts')
          .leftJoin('customers as customers_fr', 'lorry_receipts.customer_id_from', 'customers_fr.id')
          .select(db.raw('customers_fr.customer_name'))
          .leftJoin('customers as customers_to', 'lorry_receipts.customer_id_from', 'customers_to.id')
          .select(db.raw('customers_to.customer_name'))
          .leftJoin('lorry_transactions', 'lorry_receipts.id', 'lorry_transactions.lorry_id')
          .leftJoin('lorry_billings', 'lorry_receipts.id', 'lorry_billings.lorry_id')
          .leftJoin('lorry_freights', 'lorry_receipts.id', 'lorry_freights.lorry_id')
          .where({ 'lorry_receipts.id': id, 'lorry_receipts.trash': 0 }),
      )
      .then(async (result) => {
        try {
          await callBack({
            status: 200,
            message: 'Lr Invoice',
            description: 'Lr Invoice Read Successfully!',
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

  FilterQuery: (tableLr, tableLt, tableBill, tableFreight, data, callBack) => {
    db(tableLr)
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

module.exports = Lr;
