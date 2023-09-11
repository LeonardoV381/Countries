const { Country } = require("../db");
const axios = require("axios");


const searchCountryById = async (id) =>{
 
    const country = await Country.findAll( 
      { where : {
         id : id
   }
   }
   );
   console.log("estoy en busqueda por id");
 
   
  
     return country;
  
    
   };

   module.exports = { searchCountryById };