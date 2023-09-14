const { findAllCountries, searchCountriesByName } = require("../controllers/CountriesController")



const getCountriesHandler = async ( req, res ) => { 
  // search countries includes in country or search all the countries
  const country = req.query.name;
  try {
    const results =  country ? await searchCountriesByName(country) : await findAllCountries();
    res.status(200).json(results);
    
  } catch (error) {
    res.status(400).json({error:error.message});
  }

}


module.exports = {
    getCountriesHandler,

}