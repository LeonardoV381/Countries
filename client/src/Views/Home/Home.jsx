import { useEffect, useState } from "react";
import Cards from "../../Cards/Cards";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, previousPage, nextPage,  totalPages, getActivities, getActivitiesByCountryId, filterContAct, filterNamePop } from "../../redux/actions";
import countriesVideo from "../../images/countriesVideo.mp4";
import style from "./Home.module.css";

const Home = () => {
    
    const dispatch = useDispatch();
    const countries = useSelector(state => state.countries);
    const activities = useSelector((state) => state.activities);
    // console.log(activities);

    const activitiesId = useSelector((state) => state.activitiesCountryId);
    const actualPage = useSelector(state => state.actualPage);
    const sort1 = useSelector((state) => state.continentsActivities);
    const sort2 =useSelector((state) => state.namePopulation);
    const [ sortDirection, setSortDirection ] = useState("desc"); //button order
    const countriesDisplay = 10;  
    const totalPage = useSelector((state) => state.totalPages);
   
  //copy without modification of original
let filteredAndSortedCountries = [...countries];

const act2 = [];


 if (sort1 === "continents") {
  filteredAndSortedCountries = filteredAndSortedCountries.sort((a, b) => {
    return a.continents.localeCompare(b.continents);
  });
}
else if (sort1 === "activities")  {
    // for(let i=0; i < activities.length; i++){
    //    for(let j=0; j<filteredAndSortedCountries.length){
           
    //    }
    // }
    for(let i=0; i<filteredAndSortedCountries.length;i++){
       getCountriesActivities(filteredAndSortedCountries[i].id)
      
    
    }
  
  }


   
if (sort2 === "name" && sortDirection==="desc") {
    filteredAndSortedCountries = filteredAndSortedCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
    });
    }
else if (sort2 === "name" && sortDirection==="asc") {
   filteredAndSortedCountries = filteredAndSortedCountries.sort((a, b) => {
   return b.name.localeCompare(a.name);
   });
}
    
else if (sort2 === "population" && sortDirection==="desc" ) {
    filteredAndSortedCountries = filteredAndSortedCountries.sort((a, b) => {
     return a.population - b.population;
    });
 }
else if (sort2 === "population" && sortDirection==="asc" ) {
    filteredAndSortedCountries = filteredAndSortedCountries.sort((a, b) => {
    return b.population - a.population;
 });
}
   

    // Aplicar la paginación
  const startIndex = actualPage * countriesDisplay;
  const endIndex = startIndex + countriesDisplay;
  const displayCountries = filteredAndSortedCountries.slice(startIndex, endIndex);


    
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
    },[dispatch, totalDisplay, sort1, sort2])

  
   
    const handleSortForChange = (event) => {
      const sortA = event.target.value;
      dispatch(filterContAct(sortA));
    };
 

    const handleSortChange = (event) => { //name and population
        const sortB = event.target.value
        dispatch(filterNamePop(sortB));
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
   
    }, [dispatch]);

  
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
             <button className={style.buttons} onClick={ goToPrevPage } disabled={ actualPage===0 }> Prev </button>
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
              <select value={sort1}  onChange={ handleSortForChange } className={style.options} >
                 <option className={style.options} value="default">default: continents/activities</option>  
                 <option value="continents">Continents</option>
                 <option value="activities">Activities</option>
              </select>
              <select value={ sort2 }  onChange={ handleSortChange } className={style.options} >
                  <option className={style.options} value="default">default: name/population</option>  
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