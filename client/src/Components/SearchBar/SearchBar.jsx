import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCountriesByName, getCountryId, getActivitiesByCountryId, setActualPage } from "../../redux/actions";
import style from "./SearchBar.module.css";


export default function SearchBar() {

    const dispatch = useDispatch();
    let [ countries, setCountries ] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const page = 0;

    const handleChange = (event) => {
        setCountries(event.target.value);  
        setErrorMessage("");
    }

    useEffect(() =>{

    },[setCountries, countries]);

    const handleKeyPress = (event) => {
        if (/^\d+$/.test(event.key)) {
          
            event.preventDefault();
          }
       if(event.key === 'Enter') {
        handleSubmit(event);
       }
    }

    const handleSubmit = (event) => {
       
        if(countries.length === 3 && countries === countries.toUpperCase()){
            dispatch(getCountryId(countries));
            dispatch(getActivitiesByCountryId(countries))
            console.log("estoy en busqueda id desde search");
            setCountries("");
        }
        else{
            if(countries.length > 0 ){
                dispatch(setActualPage(page))
                dispatch(getCountriesByName(countries))
             .then((response) => {
                if(response && response.error) {
                    setErrorMessage(`El país "${countries}" no se ha encontrado`);
                    window.alert("Country inserted not found")
                }
                else{
                    setErrorMessage("");
                   
                    // window.alert("Country inserted not found")
                    // window.location.reload();
                }
             })
             .catch((error) => {
                console.error("Error en la solicitud:", error); 
             });
           
            }
            else if(countries.length === 0){
                window.alert("La busqueda está vacia")
                setErrorMessage("Please enter a valid country");
            }
        }    
    }

    return(
        <div className={style.container}>
            <input className={style.input} type="text" placeholder="Search countrie(s)" onChange={(event) => handleChange(event) } onKeyPress={(event) => handleKeyPress(event)} />
            <button className={style.button} type="submit"     
             onClick={(event) => handleSubmit(event) }
            >Search</button>
             {errorMessage && <p className={style.errorMessage}>{errorMessage}</p>}
        </div>
        
    )
};

