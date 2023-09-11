import { useLocation } from 'react-router-dom';
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Landing from "./Views/Landing"
import Home from "./Views/Home/Home"
import Detail from "./Views/Detail/Detail"
import NavBar from "./Components/NavBar/NavBar"
import Create from "./Views/Create/Create"


function App() {
   const location = useLocation();

  return (
    <>
       
            { location.pathname !== "/" && <NavBar />}
          <Routes>
          <Route  exact path="/" element={ <Landing />} />
          <Route exact  path="/home" element={ <Home />} />
          <Route exact path="/detail" element={ <Detail /> }/>
          <Route exact path="/create" element={ <Create /> }/>
        </Routes>
    </>
  )
}

export default App
