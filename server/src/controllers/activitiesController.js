const { Activity, Country } = require("../db");
const { CountryActivity } = require("../db");
const { Op } = require('sequelize');



//arrive info via body and search country for countryId to create
const createActivity = async( name, dificulty, time, season, countriesName) => {
    const newActivity =  await Activity.create({ name, dificulty, time, season });
  
    //asociation to countries ID
    const countriesId = [];

    for(const countryName of countriesName){
        const country = await Country.findOne({
            where: {
                [ Op.or ]: [
                    {
                    name: {
                      [ Op.iLike ]: countryName
                    }
                    },   
                ]
            },
        });
        //if find country in data Base push ID country finded
        if( country ){
            countriesId.push(country.id);
        }
    }
    //add countries Id for relation with activity
    await newActivity.addCountries(countriesId);
    return newActivity;
};

//find activities by country id
const getCountryActivitiesByCountryId = async (id) => {
    // const act = await CountryActivity.findAll();
    console.log("que haces aqui");
    const countryActivities = await CountryActivity.findAll({
        where: {
          CountryId : id
        },
    });
    return countryActivities;
};




//get array of objects activities
const getActivities = async () => {
    const dataBaseActivities = await Activity.findAll();
    
    return dataBaseActivities;
}

module.exports = {
    createActivity, 
    getCountryActivitiesByCountryId,
    getActivities,

}

