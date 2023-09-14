const { Router } = require('express');
const {
    createActivityHandler, getActivitiesHandler, getCountryActivitiesByCountryIdHandler, 
} = require("../handlers/activitiesHandler");


const activitiesRouter = Router();

activitiesRouter.post("/", createActivityHandler);
activitiesRouter.get("/", getActivitiesHandler);
activitiesRouter.get("/:id", getCountryActivitiesByCountryIdHandler);


module.exports = activitiesRouter;