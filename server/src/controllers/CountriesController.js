const { Country } = require("../db");
const axios = require("axios");
const { Op } = require('sequelize');


const cleanArray = (arr) => {
    const clean = arr.map((elem) => {
        return {
            id : elem.cca3,
            name: elem.name.common,
            image: elem.flags.png,
            continents: elem.continents[0],
            capital: elem.capital ?  elem.capital[0] : "No capital",
            subregion: elem.subregion,
            area: elem.area + "  KM2",
            population: elem.population
        };
    });
    return clean;
};


const findAllCountries = async () => { 
  const count = await checkIfCountriesIsEmpty();
  
  const dataBaseCountriesRaw = (await axios.get('http://localhost:5000/countries')).data
//   return [dataBaseCountriesRaw]

const dataBaseCountries = cleanArray(dataBaseCountriesRaw);

if(count === true){
await writeCountry(dataBaseCountries);
}
else{
    console.log("La tabla countries ya ha sido llenada")
}
 
return dataBaseCountries;


};

const writeCountry = async (dataBaseCountries) => { //función para llenar la tabla Countries
   console.log("Cargando la base de datos countries...");
  await dataBaseCountries.map((elem) =>{
        Country.create({
            
                id: elem.id,
                name: elem.name,
                image: elem.image,
                continents: elem.continents,
                capital: elem.capital,
                subregion: elem.subregion,
                area: elem.area,
                population: elem.population
            
        });
    });


};

//verify if dataBase counties is empty 
const checkIfCountriesIsEmpty = async() =>{
    try {
        const  count = await Country.count();
        return count === 0; //Devuelve true si la tabla Country se encuentra vacía
        
    } catch (error) {
        console.error("Error:", error.message);
        return false;
    }
};

//search country by name
const searchCountriesByName = async (country) => {
 
    const dataBaseCountries = await Country.findAll( { where : {
      [ Op.or ]: [
        {
        name: {
          [ Op.iLike ]: `%${country.toLowerCase()}%` //búsqueda sin importar si son mayúsculas o minúsculas
        }
        },
        {
          name: {
          [ Op.like ]: `%${country}%` //que la variable de la entrada al menos esté incluída y se encuentre dentro de la búsqueda
        }
      }
      ]
   }
   });

   return dataBaseCountries

};



module.exports = {
    findAllCountries,
    searchCountriesByName,
    // searchCountryById
}