const nested = require('nested-knex');

const dataSelect = nested.array(
  nested.type({
    id: nested.number('lorry_receipts.id', { id: true }),
    branche_id: nested.number('lorry_receipts.branche_id'),
    lr_id: nested.number('lorry_receipts.lr_id'),
    invoice_no: nested.string('lorry_receipts.invoice_no'),
    vehicle_id: nested.string('lorry_receipts.vehicle_id'),
    customer_id_from: nested.string('lorry_receipts.customer_id_from'),
    customer_from: nested.string('customers_fr.customer_name'),
    customer_to: nested.string('customers_to.customer_name'),
    consignorgst_from: nested.string('lorry_receipts.consignorgst_from'),
    consigner_address_from: nested.string('lorry_receipts.consigner_address_from'),
    place_id_from: nested.string('lorry_receipts.place_id_from'),
    customer_id_to: nested.string('lorry_receipts.customer_id_to'),
    consignorgst_to: nested.string('lorry_receipts.consignorgst_to'),
    consigner_address_to: nested.string('lorry_receipts.consigner_address_to'),
    place_id_to: nested.string('lorry_receipts.place_id_to'),
    delivery_at: nested.string('lorry_receipts.delivery_at'),
    delivery_address: nested.string('lorry_receipts.delivery_address'),
    city: nested.string('lorry_receipts.city'),
    created_at: nested.string('lorry_receipts.created_at'),
    updated_at: nested.string('lorry_receipts.updated_at'),
    lorry_billings: nested.type({
      id: nested.number('lorry_billings.id', { id: true }),
      lorry_id: nested.string('lorry_billings.lorry_id'),
      material_cost: nested.string('lorry_billings.material_cost'),
      delivery_type: nested.string('lorry_billings.delivery_type'),
      delivery_days: nested.string('lorry_billings.delivery_days'),
      pay_type: nested.string('lorry_billings.pay_type'),
      to_billed: nested.string('lorry_billings.to_billed'),
      collect_at_branch: nested.string('lorry_billings.collect_at_branch'),
      service_tax_by: nested.string('lorry_billings.service_tax_by'),
      remark: nested.string('lorry_billings.remark'),
      created_at: nested.string('lorry_billings.created_at'),
      updated_at: nested.string('lorry_billings.updated_at'),
    }),
    lorry_freights: nested.type({
      id: nested.number('lorry_freights.id', { id: true }),
      lorry_id: nested.string('lorry_freights.lorry_id'),
      total_freight: nested.string('lorry_freights.total_freight'),
      osc: nested.string('lorry_freights.osc'),
      door: nested.string('lorry_freights.door'),
      other_charges: nested.string('lorry_freights.other_charges'),
      hamali: nested.string('lorry_freights.hamali'),
      statistical: nested.string('lorry_freights.statistical'),
      total: nested.string('lorry_freights.total'),
      trash: nested.string('lorry_freights.trash'),
      created_at: nested.string('lorry_freights.created_at'),
      updated_at: nested.string('lorry_freights.updated_at'),
    }),
    lorry_transactions: nested.array(
      nested.type({
        id: nested.number('lorry_transactions.id', { id: true }),
        lorry_id: nested.number('lorry_transactions.lorry_id'),
        articale_id: nested.string('lorry_transactions.articale_id'),
        no_of_article: nested.string('lorry_transactions.no_of_article'),
        description: nested.string('lorry_transactions.description'),
        weight: nested.string('lorry_transactions.weight'),
        rate_per: nested.string('lorry_transactions.rate_per'),
        rate: nested.string('lorry_transactions.rate'),
        freight: nested.string('lorry_transactions.freight'),
        total_no_article: nested.string('lorry_transactions.total_no_article'),
        total_weight: nested.string('lorry_transactions.total_weight'),
        trash: nested.string('lorry_transactions.trash'),
        created_at: nested.string('lorry_transactions.created_at'),
        updated_at: nested.string('lorry_transactions.updated_at'),
      }),
    ),
  }),
);

module.exports = dataSelect;
