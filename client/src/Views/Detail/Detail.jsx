import {  useSelector, useDispatch }  from "react-redux";
import {  useEffect, useState } from "react";
import style from "./Detail.module.css";
import world from "../../images/world.jpg";
import { clearCountryId } from "../../redux/actions";
import activit from "../../images/activit.gif"





const Detail = () => {

  const dispatch = useDispatch();

  const detailCountry =  useSelector(state => state.detail);
  const detailActivities = useSelector((state) => state.activitiesCountryId);
  const activities = useSelector((state) => state.activities);
  let act = [];

    
  //  limpia el estado de la búsqueda anterior una vez se desmonte
    useEffect(() =>{ 
      return () => {
        dispatch(clearCountryId());

      }
    },[dispatch]);

 
    
    if(detailCountry.length === 0){
     
      return(
        <div className={style.background} style={{ backgroundImage: `url(${world})` }}>
          <h1 className={style.textNull}>Busca un ID de país en mayúsculas</h1>
        </div>
      )
    }
    else {
      
       console.log(detailActivities);
       //search id activities
       if (detailActivities ) {
          for(let i = 0; i < activities.length; i++){
            for(let j=0; j <detailActivities.length; j ++){
               if(activities[i].id === detailActivities[j].ActivityId){
               act.push(activities[i]); 
              }
            }
          }   
       } 
      
     }
    return(
        <div className={style.background} style={{ backgroundImage: `url(${world})` }}> 
         <div className={style.container}>       
            <div className={style.text} >
              <h1>ID: {detailCountry[0].id}</h1>
              <h1>Country: {detailCountry[0].name}</h1>
              <img className={style.flag} src={detailCountry[0].image} />
              <h1>Continent: {detailCountry[0].continents}</h1>
              <h1>Capital: {detailCountry[0].capital}</h1>
              <h1>Subregión: {detailCountry[0].subregion}</h1>
              <h1>Area: {detailCountry[0].area}</h1>
              <h1>Population: {detailCountry[0].population} People</h1>    
            </div>
          </div>
              <h1> Found { act.length } Activities</h1>
              <br />
              { act.map((acts) =>{  
                return(
                  <div  style={{backgroundImage: `url(${activit})`}} className={style.containerActivities} key={acts.id}>
                    <h1 className={style.textId}> Id: {acts.id}</h1>
                    <h1> Activity: {acts.name}</h1>
                    <h1> Dificulty: {acts.dificulty}</h1>
                    <h1> Time: {acts.time}</h1>
                    <h1> Season: {acts.season}</h1>
                    <br />
                  </div>
                )
              })}  
        </div>
    )


};

export default Detail;

