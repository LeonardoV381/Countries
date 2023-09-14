const { countryActivities } = require("../controllers/countryActivityController")

const getCountryActivityHandler = async (req,res) =>{
  try {
    const countAct = await countryActivities();
    res.status(200).json(countAct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getCountryActivityHandler}