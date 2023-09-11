const { Router } = require("express");
const countriesRouter = require("./countriesRouter");
const activitiesRouter = require("./activitiesRouter");
const detailRouter = require("./detailRouter");

const router = Router();

router.use("/countries", countriesRouter);
router.use("/activities", activitiesRouter);
router.use("/detail/", detailRouter);


module.exports = router;
