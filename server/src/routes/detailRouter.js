const { Router } = require('express');
const { getCountryByIdHandler } = require("../handlers/detailHandler");

const detailRouter = Router();

detailRouter.get("/:id", getCountryByIdHandler);

module.exports = detailRouter;