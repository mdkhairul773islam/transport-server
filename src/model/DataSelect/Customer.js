const nested = require('nested-knex');

const dataSelect = nested.array(
  nested.type({
    id: nested.number('customers.id', { id: true }),
    branchs_id: nested.string('customers.branchs_id'),
    customer_name: nested.string('customers.customer_name'),
    correspondence_address: nested.string('customers.correspondence_address'),
    telephone: nested.string('customers.telephone'),
    faxno: nested.string('customers.faxno'),
    cstno: nested.string('customers.cstno'),
    gstno: nested.string('customers.gstno'),
    states: nested.string('customers.states'),
    city: nested.string('customers.city'),
    customer_email: nested.string('customers.customer_email'),
    vendorcode: nested.string('customers.vendorcode'),
    vatno: nested.string('customers.vatno'),
    eccno: nested.string('customers.eccno'),
    opening_balance: nested.string('customers.opening_balance'),
    payment_type: nested.string('customers.payment_type'),
    closing_balance: nested.string('customers.closing_balance'),
    closing_payment_type: nested.string('customers.closing_payment_type'),
    created_at: nested.string('customers.created_at'),
    updated_at: nested.string('customer_references.updated_at'),
    customer_references: nested.array(
      nested.type({
        id: nested.number('customer_references.id', { id: true }),
        customers_id: nested.string('customer_references.customers_id'),
        name: nested.string('customer_references.name'),
        address: nested.string('customer_references.address'),
        designation: nested.string('customer_references.designation'),
        email: nested.string('customer_references.email'),
        mobile: nested.string('customer_references.mobile'),
        created_at: nested.string('customer_references.created_at'),
        updated_at: nested.string('customer_references.updated_at'),
      }),
    ),
  }),
);

module.exports = dataSelect;
