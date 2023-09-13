const {
    createActivity, 
    getActivities,
    getCountryActivitiesByCountryId
} = require("../controllers/activitiesController")



 //crear una actividad nueva por body
const createActivityHandler = async ( req, res ) => {
  try {
    const {  name, dificulty, time, season, countriesName }  = req.body;
    const newActivity = await createActivity(name, dificulty, time, season, countriesName);
    res.status(200).json({ newActivity });
  } catch (error) {
    res.status(400).json({ error: error.message});
  }
};


const getCountryActivitiesByCountryIdHandler = async (req, res ) => {
  const { id } = req.params;
  try {
    const activitiesId = await getCountryActivitiesByCountryId(id);
    res.status(200).json(activitiesId);
  } catch (error) {
    res.status(400).json({ error: "Cant create the new activity"});
  }
}


//consultar las actividades creadas en un arreglo de objetos en donde cada objeto es una actividad turística
const getActivitiesHandler = async ( req, res ) => { 
    try {
        const activities = await getActivities();
        res.status(200).json(activities);
    } catch (error) {
        res.status(400).json({ error : error.message});
    }
    
};





module.exports = {
    createActivityHandler,
    getCountryActivitiesByCountryIdHandler,
    getActivitiesHandler
}