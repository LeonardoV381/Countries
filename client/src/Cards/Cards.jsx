import Card from "../Card/Card";
import style from "./Cards.module.css";



const Cards = ({ countries }) => {
   
 
    return(
        <div className={style.container}>
            { countries.map((country) => { 
                return <Card 
                
                  key= { country.id }
                  id= { country.id}
                  image= { country.image }
                  name= { country.name }
                  continents= { country.continents }
                />
            })}
        </div>
        
    )

}
export default Cards;