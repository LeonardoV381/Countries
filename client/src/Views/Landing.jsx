import mundo from "../images/mundo.gif"
import style from "./Landing/Landing.module.css"
import { useNavigate } from "react-router-dom";
import intro from "../images/intro.jpg"

const Landing = () =>{
  const navigate = useNavigate();

  const handleAccess = () => {
     navigate("/home");
  };

    return(
        <> 
            <div className={style.fondo} style={{ backgroundImage: `url(${intro})` }}>
                
              <h1 className={style.title}>Welcome to APP Countries 
              </h1>
              <img className={style.image} src={mundo} alt="animated GIF" />
              <br/>
            </div>
            <div >
               <button className={style.button} onClick= { handleAccess }>INTRO</button>
           </div>
        </>
    )
}

export default Landing;