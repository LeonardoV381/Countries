import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCountriesByName, getCountryId, getActivitiesByCountryId } from "../../redux/actions";
import style from "./SearchBar.module.css";


export default function SearchBar() {

    const dispatch = useDispatch();
    let [ countries, setCountries ] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (event) => {
      
        setCountries(event.target.value);  
        setErrorMessage("");
    }

    const handleKeyPress = (event) => {
       if(event.key === 'Enter') {
        handleSubmit(event);
       }
    }

    const handleSubmit = (event) => {
       
        if(countries.length === 3 && countries === countries.toUpperCase()){
            dispatch(getCountryId(countries));
            dispatch(getActivitiesByCountryId(countries))
            console.log("estoy en busqueda id desde search");
        }
        else{
            if(countries.length > 0 ){
            dispatch(getCountriesByName(countries))
             .then((response) => {
                if(response && response.error) {
                    setErrorMessage(`El país "${countries}" no se ha encontrado`);
                }
                else{
                    setErrorMessage("");
                }
             })
             .catch((error) => {
                console.error("Error en la solicitud:", error); 
             });
           
            }
            else{
                setErrorMessage("Please enter a valid country");
            }
        }    
    }

    return(
        <div className={style.container}>
            <input className={style.input} type="text" placeholder="Search countrie(s)" onChange={(event) => handleChange(event) } onKeyPress={handleKeyPress} />
            <button className={style.button} type="submit"     
             onClick={(event) => handleSubmit(event) }
            >Search</button>
             {errorMessage && <p className={style.errorMessage}>{errorMessage}</p>}
        </div>
        
    )
};

