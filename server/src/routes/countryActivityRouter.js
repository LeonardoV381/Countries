const { Router } = require('express');
const  { getCountryActivityHandler} = require("../handlers/countryActivityHandler");

const countryActivityRouter = Router();

countryActivityRouter.get("/", getCountryActivityHandler);

module.exports = countryActivityRouter;