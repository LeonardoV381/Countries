import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import style from "./Create.module.css"
import { getCountries } from "../../redux/actions";
import imageFond from "../../images/imageFond.jpg";
import axios from "axios";



const Create = () =>{

  const  dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const [ season, setSeason ] = useState("Select"); 

  let countriesOrder = [ ...countries];
  
  countriesOrder = countriesOrder.sort((a, b) => {
    return a.name.localeCompare(b.name);
  })
  

  useEffect(() => {
    dispatch(getCountries());
    }, [dispatch]);
 


   const [ input, setInput ] = useState({
    name: "",
    dificulty : "",
    time:  "",
    season: "",
    countriesName: [],
    });


  const [ error, setError ] = useState({
   name: "",
   dificulty : "",
   time:  "",
   season: "",
   countriesName: [],
  });

   

  


  const handleChange = (event) => {
    const { value, name } = event.target;
    setInput({ ...input, [ name ] : value });
    setError(validate({ 
      ...input, [ name ] : value
    }));
  }



  
  const handleSort = (event) => {
    const { value, name } = event.target; 
    setSeason(value)
    setInput({...input, [ name ] : value});
    setError(validate({
    ...input, [ name ] : value
    }))
}
         
  const handleChangeCountries = (event) => {
  const { value, name } = event.target;
  if (value){
      setInput((prevInput) => ({
      ...prevInput,
      countriesName: [...prevInput.countriesName, value],
      }));
      
          
  }
  };

  useEffect(() => {
    setError(validate(input));
  },[input])


  const handleSubmit = async  (event) => {
     event.preventDefault();
     try {
    if(!Object.keys(error).length){
      
      await  axios.post("http://localhost:3001/activities", input )
      window.alert("Activity was created succesfully ");
      setSeason("Select");
      setInput({
        name: "",
        dificulty : "",
        time:  "",
        season: "",
        countriesName: []
       })

       setError({
        name: "",
        dificulty : "",
        time:  "",
        season: "",
        countriesName: []
        })
    
    }
    else{
      console.log(error);
       return window.alert("Please check all the fields", error);
    } 
     
   

     } catch (error) {
      window.alert("Error for send the data, please check all the fields", error)
     }
    
  }
 
    return(
    <form  onSubmit={ handleSubmit}>
      <div className={style.background} style={{ backgroundImage: `url(${imageFond})` }}>
        <div className={style.container}>
         <div>
          <h1>Create Activity</h1>
         </div>
         <div className={style.label}>    
           <label> Activity: *</label>
         </div>  
         <input className={style.input}
          name='name'
          value={input.name}
          onChange={handleChange}
          placeholder="Please type an activity"
          type='text' />
          {error.name ? <p className={style.danger}>{error.name}</p> : null}
         <br />
        <div className={style.label}>    
          <label > Dificulty: *</label>
        </div>
        <input className={style.input}
          name='dificulty'
          value={input.dificulty}
          onChange={handleChange}
          placeholder="Type a dificulty from 1 to 5"
          type='number' />
          {error.dificulty ? <p className={style.danger}>{error.dificulty}</p> : null}
          <br /> 
        <div className={style.label}>    
          <label> Time (number in hours): </label>
        </div>
          <input className={style.input}
          name='time'
          value={input.time}
          onChange={handleChange}
          placeholder="Type time in hours"
          type='number' />
          {/* {error.time ? <p className={style.danger}>{error.time}</p> : null} */}
          <br />
         <div className={style.label}>    
          <label> Season: *</label>
         </div>
          <label className={style.input}> 
              Select Please season
              <select value={ season } name="season"   onChange={ handleSort } className={style.input}>
                 <option value="select">Select</option>  
                 <option value="Spring">Spring</option>
                 <option value="Summer">Summer</option>
                 <option value="Fall">Fall</option>
                 <option value="Winter">Winter</option>
              </select>
          {error.season ? <p className={style.danger}>{error.season}</p> : null}
          <br />
        </label>
         <div className={style.label}>  
         <div className={style.countries}>
            {input.countriesName.map((country) => (
            <li key={ country }>{country}, </li>
             ))}
         </div>
         <br />
         <label > Select please country(es) for activities:</label>
        </div>
           <select
           name="country"
           value={input.country}
           onChange={handleChangeCountries}
         >
          <option value="">Select a Country</option>
          {countriesOrder.map((country) => (
          <option key={country.name} value={country.name}
        
          >
          {country.name}
          </option>
          
          ))}
          </select>
          {error.countriesName ? <p className={style.danger}>{error.countriesName}</p> : null}
         
         <br />
         <br />
         <button type= "submit"
                 disabled={Object.keys(error).length >0}
                 className= {Object.keys(error).length? style.buttonError : style.button}
                
         >
            CREATE ACTIVITY
         </button>
        </div>
   </div>
          
</form>
)

};

export default Create;



const validate = (input) => {
   let error= {};
  if(!input.name.length){
    error.name= "Please digit an activity name";
   }
   if(input.name.length < 4 && input.name.length >= 1){
    error.name= "More info";
   }
   if(/[\d]/.test(input.name)) {
    error.name = "Activity cant has numbers";
  }
   if(!/^\d+$/.test(input.dificulty)) {
    error.dificulty = "Dificulty must be a number between 1 to 5"
   } 
   if(!input.dificulty.length){
    error.dificulty= "Please digit a level of dificulty between 1 to 5"
   }
   if((input.dificulty) <1 || (input.dificulty) > 5) {
    error.dificulty = "Dificulty must be a number between 1 to 5";
  }

  // if(input.time < 0 || input.time > 12) {
  //   error.time = "Time must be between 0 to 12 hours";
  // }
 
  
  if (!input.season) {
    error.season = "Please choose a season";
  }
  if((input.season !== "Summer") && (input.season !=="Fall") && (input.season !== "Winter") && (input.season !=="Spring")){
    error.season = "Please select  any of four seasons";
  }
  if(input.countriesName.length === 0){
    error.countriesName = " Please select country or countries";
  }
  return(error);
}