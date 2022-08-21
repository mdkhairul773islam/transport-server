const { Insert, Select, Delete, SelectSingle, FilterQuery, Update } = require('../model/Lr.model');
const { getDate } = require('../utility/utility');

const updatedAt = getDate(new Date());

const tableLr = 'lorry_receipts';
const tableBill = 'lorry_billings';
const tableFreight = 'lorry_freights';
const tableLt = 'lorry_transactions';

const AddLr = (req, res) => {
  const { lorryReceiptData, lorryTransactionData, lorryFreightData, lorryBillingData } = req.body;
  console.log(req.body);

  Insert(
    tableLr,
    tableLt,
    tableBill,
    tableFreight,
    lorryReceiptData,
    lorryTransactionData,
    lorryFreightData,
    lorryBillingData,
    (result) => {
      res.send(result);
    },
  );
};

const GetLr = (req, res) => {
  const { perPage, currentPage } = req.query;
  Select(perPage, currentPage, (result) => {
    res.send(result);
  });
};

const DeleteLr = (req, res) => {
  const { id } = req.query;
  Delete(tableLr, tableLt, tableBill, tableFreight, id, (result) => {
    res.send(result);
  });
};

const Invoice = (req, res) => {
  const { id } = req.query;
  SelectSingle(id, (result) => {
    res.send(result);
  });
};

const HandleSearch = (req, res) => {
  FilterQuery(tableLr, tableLt, tableBill, tableFreight, req.query.data, (result) => {
    res.send(result);
  });
};

const UpdateLr = (req, res) => {
  const lorryReceiptData = {
    id: 1,
    branche_id: 1,
    lr_id: 1,
    invoice_no: '12452',
    vehicle_id: 1,
    customer_id_from: 1,
    consignorgst_from: 1,
    consigner_address_from: 'Update consigner_address_from',
    place_id_from: 1,
    customer_id_to: 1,
    consignorgst_to: 1,
    consigner_address_to: 'consigner_address_to',
    place_id_to: 1,
    delivery_at: 'delivery_at',
    delivery_address: 'delivery_address',
    city: 'city',
    created_at: '2022-04-24',
    updated_at: updatedAt,
  };

  const lorryTransactionData = [
    {
      id: 1,
      lorry_id: 1,
      articale_id: 1,
      no_of_article: 'Update no_of_article',
      description: 'description',
      weight: 10,
      rate_per: 12,
      rate: 123,
      freight: 65,
      total_no_article: 20,
      total_weight: 100,
      created_at: '2022-04-13T18:00:00.000Z',
    },
    {
      id: 2,
      lorry_id: 1,
      articale_id: 2,
      no_of_article: 'Update 2no_of_article2',
      description: 'description2',
      weight: 102,
      rate_per: 122,
      rate: 1232,
      freight: 652,
      total_no_article: 202,
      total_weight: 1002,
      created_at: '2022-04-13T18:00:00.000Z',
    },
  ];

  const lorryBillingData = {
    id: 1,
    lorry_id: 1,
    material_cost: 1200,
    delivery_type: 'Update delivery_type',
    delivery_days: 10,
    pay_type: 'pay_type',
    to_billed: 'to_billed',
    collect_at_branch: 1,
    service_tax_by: 'service_tax_by',
    remark: 'remark',
    created_at: '2022-04-24',
    updated_at: updatedAt,
  };

  const lorryFreightData = {
    id: 1,
    lorry_id: 1,
    total_freight: 1,
    osc: 1020,
    door: 1,
    other_charges: 1,
    hamali: 1,
    statistical: 1,
    total: 1,
    created_at: '2022-04-24',
    updated_at: updatedAt,
  };

  Update(
    tableLr,
    tableLt,
    tableBill,
    tableFreight,
    lorryReceiptData,
    lorryTransactionData,
    lorryBillingData,
    lorryFreightData,
    req.body.id,
    (result) => {
      res.send(result);
    },
  );
};

module.exports = {
  AddLr,
  GetLr,
  DeleteLr,
  HandleSearch,
  Invoice,
  UpdateLr,
};
