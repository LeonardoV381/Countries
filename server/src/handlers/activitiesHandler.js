const {
    createActivity, 
    getActivities,
    getCountryActivitiesByCountryId,
    
} = require("../controllers/activitiesController")



 //create an activity via body
const createActivityHandler = async ( req, res ) => {
  try {
    const {  name, dificulty, time, season, countriesName }  = req.body;
    const newActivity = await createActivity(name, dificulty, time, season, countriesName);
    res.status(200).json({ newActivity });
  } catch (error) {
    res.status(400).json({ error: error.message});
  }
};

//handler for get activities by country id
const getCountryActivitiesByCountryIdHandler = async (req, res ) => {
  const { id } = req.params;
  try {
    const activitiesId = await getCountryActivitiesByCountryId(id);
    res.status(200).json(activitiesId);
  } catch (error) {
    res.status(400).json({ error: error.message});
  }
}


const getCountryActivityHandler = async (req, res) => { ///-CountryActivity
  try {
    const co = await countryActivities();
    res.status(200).json(co);
  } catch (error) {
    res.status(400).json({error : error.message});
    
  }
}


//get all the activities handler
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
    getCountryActivityHandler,
    getActivitiesHandler
}