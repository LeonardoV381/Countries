import { GET_COUNTRIES, GET_COUNTRY_ID, CLEAR_COUNTRY_ID ,GET_COUNTRIES_BY_NAME, POST_ACTIVITIES, GET_ACTIVITIES_BY_COUNTRY_ID, GET_ACTIVITIES, SET_ACTUAL_PAGE, SORT_NAME_POP, SET_TOTAL_PAGES } from "./actions";

const initialState = {
    countries : [],
    activities : [],
    activitiesCountryId: [],
    detail : [],
    actualPage : 0,
    totalPages : 0,
    // sortBy : [ { defect : true} , {name : false}, { population: false}, ],
    // order : [ {defect :true}, {ascendent: false},{descendent : false} ],
    
};

const rootReducer = (state= initialState, action) => {
    switch(action.type){
        case GET_COUNTRIES: 
          return { ...state, countries: action.payload };
        
        case GET_COUNTRY_ID:
         return { ...state, detail: action.payload };
        
        case GET_COUNTRIES_BY_NAME:
            return { ...state, countries: action.payload };
        
        case POST_ACTIVITIES:
            return { ...state, activities: [ ...state.activities, action.payload ]};
        case GET_ACTIVITIES_BY_COUNTRY_ID:
            return { ...state, activitiesCountryId: action.payload };
        case GET_ACTIVITIES:
            return { ...state, activities: action.payload};
        case SET_ACTUAL_PAGE:
            return { ...state, actualPage: action.payload };
        case SET_TOTAL_PAGES:
            return { ...state, totalPages: action.payload }; 
        case  CLEAR_COUNTRY_ID:
            return { ...state, detail: action.payload};
        case SORT_NAME_POP:
            return { ...state, sortBy : action.payload};
        default :
         return {...state};
                
                
    }
};

export default rootReducer;