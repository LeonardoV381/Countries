const { CountryActivity } = require("../db");


//find all the activities from CountryActivity//-------------------------
const countryActivities = async () => {
    const countAct = await CountryActivity.findAll();
    console.log(countAct);
    console.log("estoy en la tabla combinada");
    const countryActivityArray = countAct.map(act => {
        return {
            CountryId : act.CountryId,
            ActivityId : act.ActivityId
        };
    })
    console.log(countryActivityArray);
     return countryActivityArray;
};

module.exports = { countryActivities };
