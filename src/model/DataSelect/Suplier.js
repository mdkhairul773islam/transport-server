const nested = require('nested-knex');

const dataSelect = nested.array(
  nested.type({
    id: nested.number('suppliers.id', { id: true }),
    supplier_name: nested.string('suppliers.supplier_name'),
    supplier_type: nested.string('suppliers.supplier_type'),
    address: nested.string('suppliers.address'),
    state: nested.string('suppliers.state'),
    city: nested.string('suppliers.city'),
    telephone: nested.string('suppliers.telephone'),
    email: nested.string('suppliers.email'),
    pan_no: nested.string('suppliers.pan_no'),
    vendor_code: nested.string('suppliers.vendor_code'),
    vat_no: nested.string('suppliers.vat_no'),
    cst_no: nested.string('suppliers.cst_no'),
    ecc_no: nested.string('suppliers.ecc_no'),
    opening_balance: nested.number('suppliers.opening_balance'),
    payment_type: nested.string('suppliers.payment_type'),
    opening_balance_date: nested.string('suppliers.opening_balance_date'),
    closing_balance: nested.number('suppliers.closing_balance'),
    closing_balance_type: nested.string('suppliers.closing_balance_type'),
    closing_balance_date: nested.string('suppliers.closing_balance_date'),
    trash: nested.number('suppliers.trash'),
    created_at: nested.string('suppliers.created_at'),
    updated_at: nested.string('suppliers.updated_at'),
    suppliers_contact_person_details: nested.array(
      nested.type({
        id: nested.number('suppliers_contact_person_details.id', { id: true }),
        suppliers_id: nested.number('suppliers_contact_person_details.suppliers_id'),
        name: nested.string('suppliers_contact_person_details.name'),
        address: nested.string('suppliers_contact_person_details.address'),
        designation: nested.string('suppliers_contact_person_details.designation'),
        email: nested.string('suppliers_contact_person_details.email'),
        mobile: nested.string('suppliers_contact_person_details.mobile'),
        trash: nested.number('suppliers_contact_person_details.trash'),
        created_at: nested.string('suppliers_contact_person_details.created_at'),
        updated_at: nested.string('suppliers_contact_person_details.updated_at'),
      }),
    ),
  }),
);

module.exports = dataSelect;
