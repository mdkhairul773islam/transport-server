const nested = require('nested-knex');

const dataSelect = nested.array(
  nested.type({
    id: nested.number('vehicles.id', { id: true }),
    voname: nested.string('vehicles.voname'),
    vtype: nested.string('vehicles.vtype'),
    vehicle_no: nested.string('vehicles.vehicle_no'),
    capacity: nested.string('vehicles.capacity'),
    make: nested.string('vehicles.make'),
    description: nested.string('vehicles.description'),
    regdate: nested.string('vehicles.regdate'),
    vehicle_expdate: nested.string('vehicles.vehicle_expdate'),
    engineno: nested.string('vehicles.engineno'),
    chasisno: nested.string('vehicles.chasisno'),
    pucno: nested.string('vehicles.pucno'),
    puc_expdate: nested.string('vehicles.puc_expdate'),
    body: nested.string('vehicles.body'),
    created_at: nested.string('vehicles.created_at'),
    updated_at: nested.string('vehicles.updated_at'),
    vehicles_tax_details: nested.array(
      nested.type({
        id: nested.number('vehicles_tax_details.id', { id: true }),
        vehicles_id: nested.string('vehicles_tax_details.vehicles_id'),
        tax_type: nested.string('vehicles_tax_details.tax_type'),
        tax_amount: nested.string('vehicles_tax_details.tax_amount'),
        tax_start_date: nested.string('vehicles_tax_details.tax_end_date'),
        tax_end_date: nested.string('vehicles_tax_details.tax_end_date'),
        tax_description: nested.string('vehicles_tax_details.tax_description'),
        created_at: nested.string('vehicles_tax_details.created_at'),
        updated_at: nested.string('vehicles_tax_details.updated_at'),
      }),
    ),
  }),
);

module.exports = dataSelect;
