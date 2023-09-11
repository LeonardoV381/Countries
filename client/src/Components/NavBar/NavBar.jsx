import { NavLink, useLocation } from "react-router-dom";
import style from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import React from "react";


const NavBar = ( {onSearch} ) => {
  const location = useLocation();

React.useEffect = (() => {
   if(onSearch) {
      onSearch("");
   }
},[location.pathname, onSearch])
  
  return(
    <div className={style.container}>
        <ul className={style.container}>
           <li className={style.margin} >
              <NavLink  to="/" className={location.pathname ==="/" ? style.isActive : style.disable }>Start </NavLink>
                
          </li>
           <li className={style.margin}>
           <NavLink  to="/home"  className={location.pathname ==="/home" ? style.isActive : style.disable }>Home</NavLink>
           </li>
           <li className={style.margin}>
           <NavLink  to="/detail" className={ location.pathname ==="/detail" ? style.isActive : style.disable}>Detail</NavLink>
           </li>
           <li>
           <NavLink  to="/create" className={ location.pathname ==="/create" ? style.isActive : style.disable}>Create</NavLink>
           </li>
        </ul>
        <div className={style.containerSearch}>
           <SearchBar onSearch={ onSearch }/>
        </div>
    </div>
      
  );
};

export default NavBar;