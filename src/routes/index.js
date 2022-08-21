const express = require('express');

const Router = express.Router();
const subRoute = '/transport';

const articles = require('./Articles');
const branches = require('./Branch');
const places = require('./Place');
const employees = require('./Employee');
const banks = require('./Bank');
const bankAccounts = require('./BankAccounts');
const customer = require('./Customer');
const driver = require('./Driver');
const vehicleType = require('./VehicleType');
const vehicle = require('./Vehicle');
const suplier = require('./Suplier');
const lr = require('./Lr');

Router.use(`${subRoute}/articles`, articles);
Router.use(`${subRoute}/branch`, branches);
Router.use(`${subRoute}/places`, places);
Router.use(`${subRoute}/employees`, employees);
Router.use(`${subRoute}/bankes`, banks);
Router.use(`${subRoute}/bank-accounts`, bankAccounts);
Router.use(`${subRoute}/customers`, customer);
Router.use(`${subRoute}/drivers`, driver);
Router.use(`${subRoute}/vehicle-type`, vehicleType);
Router.use(`${subRoute}/vehicle`, vehicle);
Router.use(`${subRoute}/suplier`, suplier);
Router.use(`${subRoute}/lr`, lr);

module.exports = Router;
