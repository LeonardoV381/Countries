const { Router } = require("express");
const countriesRouter = require("./countriesRouter");
const activitiesRouter = require("./activitiesRouter");
const detailRouter = require("./detailRouter");
const countryActivityRouter = require("./countryActivityRouter");

const router = Router();

router.use("/countries", countriesRouter);
router.use("/activities", activitiesRouter);
router.use("/detail/", detailRouter);
router.use("/countryactivity", countryActivityRouter);


module.exports = router;
