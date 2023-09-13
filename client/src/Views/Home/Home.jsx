import { useEffect, useState } from "react";
import Cards from "../../Cards/Cards";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, previousPage, nextPage,  totalPages, getActivities } from "../../redux/actions";
import countriesVideo from "../../images/countriesVideo.mp4";
import style from "./Home.module.css";

const Home = () => {
    
    const dispatch = useDispatch();
    const countries = useSelector(state => state.countries);
    const activities = useSelector((state) => state.activities);
 
    const activitiesId = useSelector((state) => state.activitiesCountryId);
    console.log(activitiesId);
    const actualPage = useSelector(state => state.actualPage);
    const [ sortFor, setSortFor ] = useState("defect"); //activities, continents
    const [ sortBy, setSortBy ] = useState("defect"); //name, population
    const [ sortDirection, setSortDirection ] = useState("asc"); //button order
    const countriesDisplay = 10;  
   
         
let filteredAndSortedCountries = [...countries];



if (sortFor === "continents") {
  filteredAndSortedCountries = filteredAndSortedCountries.sort((a, b) => {
    return a.continents.localeCompare(b.continents);
  });
}
else if (sortFor === "activities") {
  filteredAndSortedCountries = filteredAndSortedCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
}


   
if (sortBy === "name" && sortDirection==="desc") {
    filteredAndSortedCountries = filteredAndSortedCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
    });
    }
else if (sortBy === "name" && sortDirection==="asc") {
   filteredAndSortedCountries = filteredAndSortedCountries.sort((a, b) => {
   return b.name.localeCompare(a.name);
   });
}
    
else if (sortBy === "population" && sortDirection==="desc" ) {
    filteredAndSortedCountries = filteredAndSortedCountries.sort((a, b) => {
     return a.population - b.population;
    });
 }
else if (sortBy === "population" && sortDirection==="asc" ) {
    filteredAndSortedCountries = filteredAndSortedCountries.sort((a, b) => {
    return b.population - a.population;
 });
}
   

    // Aplicar la paginación
  const startIndex = actualPage * countriesDisplay;
  const endIndex = startIndex + countriesDisplay;
  const displayCountries = filteredAndSortedCountries.slice(startIndex, endIndex);
//----------------------------

    
    const goToPrevPage = () => {
        if(actualPage > 0) {
           dispatch(previousPage(actualPage))
        }
    };

    const goToNextPage = () => {
        if(( actualPage + 1) * countriesDisplay < countries.length ) {
             dispatch(nextPage(actualPage))        
        }
    };
     //calculates total pages countries displays
     const  totalDisplay = () => {
        let element = 0;
        for (let i = 0; (i * countriesDisplay)< countries.length; i++) {
            element = i ;
        }
        dispatch(totalPages(element));
    }; 

    useEffect (() => {
        totalDisplay();
    },[dispatch, totalDisplay])

    const totalPage = useSelector((state) => state.totalPages);
   
    const handleSortForChange = (event) => {
      const sort = event.target.value
      setSortFor(sort);
    };
 

    const handleSortChange = (event) => { //name and population
        const sort = event.target.value
        setSortBy(sort);
        setSortDirection('desc');
       
    };

    const handleButtonChange = () => {
      const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      setSortDirection(newSortDirection);
    }
   

    //  cuando se monta que haga el dispatch
     useEffect(() => {
    
        dispatch(getCountries());
        dispatch(getActivities());
   
    }, [dispatch, sortBy]);

  
    return(
        <div>
        
          <video autoPlay loop muted className={style.back}>
           <source  src={countriesVideo} type="video/mp4" />
           Tu navegador no admite la reproducción de videos.
          </video>    
        <div >
      
        <div  className={style.container}>
           <div className={style.containerPag}>
              <div>
             <button className={style.buttons} onClick={ goToPrevPage } disabled={ actualPage===0 }> Back </button>
              </div>
              <div className={style.pages}>
                <h1>Page {actualPage + 1}/{totalPage+1}</h1>
              </div>
              <div>
              <button className={style.buttons} onClick={ goToNextPage } disabled={ (actualPage + 1) * countriesDisplay >= countries.length }> Next </button>
             </div>
           </div>
          <div className={style.sortName}>
           <label>
              Filter by:
              <select value={ sortFor }  onChange={ handleSortForChange } className={style.options}>
                 <option className={style.options} value="defect">default: continents/activities</option>  
                 <option value="continents">Continents</option>
                 <option value="activities">Activities</option>
              </select>
              <select value={ sortBy }  onChange={ handleSortChange } className={style.options}>
                  <option className={style.options} value="defect">default: name/population</option>  
                  <option value="name">Name</option>
                  <option value="population">Population</option>
               </select>
             </label>
           </div>
           <div>
             <button className={style.buttonOrder} onClick={ handleButtonChange } >{sortDirection ===  'asc'?   <p>↓   -   ↑ </p> : <p>↑   -   ↓</p> } </button>
             </div>
          </div>    
        <div>          
           
            <Cards countries={displayCountries} /> 
        </div>
    
        </div>

        
        </div>
    )
};

export default Home;