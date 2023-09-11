const { findAllCountries, searchCountriesByName } = require("../controllers/CountriesController")



const getCountriesHandler = async ( req, res ) => {  //llama todos los países, al momento de llamar países si la tabla countries está vacía, es llenada
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