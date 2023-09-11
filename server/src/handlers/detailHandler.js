const { searchCountryById } = require("../controllers/detailController");


    
const getCountryByIdHandler = async ( req, res ) => {
    const { id } = req.params;
    try {
      const country = await searchCountryById(id);
      res.status(200).json(country);
    } catch (error) {
      res.status(400).json({ error: error.message})
    }
    
};



module.exports = { getCountryByIdHandler };