const { Activity, Country } = require("../db");
const { CountryActivity } = require("../db");
const { Op } = require('sequelize');



//arrive info via body and search country for countryId to create
const createActivity = async( name, dificulty, time, season, countriesName) => {
    const newActivity =  await Activity.create({ name, dificulty, time, season });
  
    const countriesId = [];

    for(const countryName of countriesName){
        const country = await Country.findOne({
            where: {
                [ Op.or ]: [
                    {
                    name: {
                      [ Op.iLike ]: `%${countryName.toLowerCase()}%` //búsqueda sin importar si son mayúsculas o minúsculas
                    }
                    },   
                ]
            },
        });
        if( country ){
            countriesId.push(country.id);
        }
    }

    await newActivity.addCountries(countriesId);
    return newActivity;
};


const getCountryActivitiesByCountryId = async (id) => {
    const countryActivities = await CountryActivity.findAll({
        where: {
          CountryId : id
        },
    });
    return countryActivities;
}


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

