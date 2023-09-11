import style from "./Card.module.css";
import { useDispatch } from "react-redux";
import { getCountryId, getActivitiesByCountryId } from "../redux/actions";
import { Link } from "react-router-dom";
import africa from "../images/africa.gif";
import europe from "../images/europe.gif";
import oceania from "../images/oceania.gif";
import asia from "../images/asia.gif";
import southAmerica from "../images/southAmerica.gif";
import northAmerica from "../images/northAmerica.gif";
import antartica from "../images/antartica.gif";

const Card = (props) => {

   const dispatch = useDispatch(); 
   let backgroundContinent = {};

   if (props.continents === "Africa") {
    backgroundContinent = {
      backgroundImage: `url(${africa})`
    } 
   }
    else if (props.continents === "Europe") {
        backgroundContinent = {
          backgroundImage: `url(${europe})`
        }
   }
   else if (props.continents === "Oceania") {
    backgroundContinent = {
      backgroundImage: `url(${oceania})`
    }
   }
   else if (props.continents === "Asia") {
    backgroundContinent = {
      backgroundImage: `url(${asia})`
    }
   }
   else if (props.continents === "South America") {
    backgroundContinent = {
      backgroundImage: `url(${southAmerica})`
    }
   }
   else if (props.continents === "North America") {
    backgroundContinent = {
      backgroundImage: `url(${northAmerica})`
    }
   }
   else if (props.continents === "Antarctica") {
    backgroundContinent = {
      backgroundImage: `url(${antartica})`
    }
   }

const handleClick =  (event, props) =>{
    
     dispatch(getCountryId(props));
     dispatch(getActivitiesByCountryId(props))
}

    return(
     <div style={backgroundContinent} className={style.container}>
      <div  key={props.id}  >
        <Link to={"/detail"} onClick={(event) => handleClick(event, props.id)} >
        <img className={style.flag} src={ props.image } alt="flag image"></img> 
        <p  className={ props.name.length > 25 ? style.textSmall : style.text}  > Country: <br/> {props.name} </p>
        <p className={ style.text }> Continent: <br/>  {props.continents} </p>
        </Link>
      </div>
    </div>
    )
};

export default Card;