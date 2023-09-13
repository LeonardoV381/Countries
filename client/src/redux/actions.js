import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRY_ID = "GET_COUNTRY_ID";
export const GET_COUNTRIES_BY_NAME = "GET_COUNTRIES_BY_NAME";
export const POST_ACTIVITIES = "POST_ACTIVITIES";
export const GET_ACTIVITIES_BY_COUNTRY_ID = "GET_ACTIVITIES_BY_COUNTRY_ID";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const SET_ACTUAL_PAGE = "SET_ACTUAL_PAGE";
export const SET_TOTAL_PAGES = "SET_TOTAL_PAGES";
export const CLEAR_COUNTRY_ID = "CLEAR-COUNTRY_ID";
export const SORT_NAME_POP = "SORT_BY";
export const FILTER_CONT_ACT = "FILTER_CONT_ACT";
export const FILTER_NAME_POP = "FILTER_NAME_POP";


const URL = "http://localhost:3001";

//Request to axios for get ALL Countries
export const getCountries = () => {
    return async function (dispatch){
        const apiData = await axios.get(`${URL}/countries`);
        const countries = apiData.data;
        dispatch({ type: GET_COUNTRIES, payload: countries });
    };
};
//Request to axios for get country by especific id
export const getCountryId = (id) => {
    return async function(dispatch){
        const apiData = await axios.get(`${URL}/detail/${id}`);
        const country = apiData.data;
        dispatch({ type: GET_COUNTRY_ID, payload: country});
    };
};

export const clearCountryId = () => {
  return async function(dispatch){
    dispatch({ type: CLEAR_COUNTRY_ID, payload : []})
  }
}

//Request to axios for get all the countries with the conincidence search
export const getCountriesByName = (name) => {
    return async function(dispatch){
        const apiData = await axios.get(`${URL}/countries?name=${name}`);
        const countries = apiData.data;
        dispatch({ type: GET_COUNTRIES_BY_NAME, payload: countries });
    }
};

//Post activities via form
export const postActivities = (payload) => {
    return async function(dispatch) {
        try {
            const response = await axios.post(`${URL}/activities`, payload);
            return dispatch({ type: POST_ACTIVITIES, payload: response.data });
        } catch (error) {
            return {error: "No se ha podido crear la actividad"};
        }
        
        
    }
};

export const getActivitiesByCountryId = (id) => {
    return async function(dispatch) {

        try {
            const apiData = await axios.get(`${URL}/activities/${id}`);
            const activitiesByCountry = apiData.data;
            return dispatch({ type: GET_ACTIVITIES_BY_COUNTRY_ID, payload: activitiesByCountry});
        } catch (error) {
            console.error("No se ha podido obtener info de actividades por país");      
        }
    }
}

export const getActivities = () => {
    return async function(dispatch) {
        const apiData = await axios.get(`${URL}/activities`);
        const activities = apiData.data;
        dispatch({ type: GET_ACTIVITIES, payload: activities }); 
    }
};

export const setActualPage = (page) => {
  return async function(dispatch) {
    await dispatch({ type : SET_ACTUAL_PAGE, payload: page});
  }
}

export const previousPage = (actualPage) => {
    return async function(dispatch){
    await dispatch({ type: SET_ACTUAL_PAGE, payload: actualPage -1 });
    }
};

export const nextPage = (actualPage) => {
    return async function(dispatch){
    await dispatch({ type: SET_ACTUAL_PAGE, payload: actualPage +1 });
    }
};

export const totalPages = (element) => {
    return async function(dispatch){
        await dispatch({ type:SET_TOTAL_PAGES, payload: element });
    }
}
export const filterContAct= (sortBy) =>{
    return async function(dispatch){
        await dispatch({ type: FILTER_CONT_ACT, payload: sortBy})
    }
}







