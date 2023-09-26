import {
  HashRouter,
  Route,
  Routes
} from "react-router-dom";
import React from 'react'; 

import Home from './pages/home/home.jsx';
import Settings from './pages/settings/settings.jsx';
import ConfigureCover from './pages/configure_cover/configure_cover.jsx';
import OpenExisting from './pages/open_existing/open_existing.jsx';
import ConfigureCustomer from './pages/configure_customer/configure_cutomer.jsx';

function App() 
{
  return (
    <HashRouter>
      <Routes>
      <Route path='/' exact     element={ <Home/> }/>
      <Route path='configure'   element={ <ConfigureCover/> }/>
      <Route path='settings'    element={ <Settings/> }/>
      <Route path='open'        element={ <OpenExisting/>}/>
      <Route path='customer'    element={ <ConfigureCustomer/> }/>
      <Route path='cover'       element={ <ConfigureCover/> }/>
      </Routes>
    </HashRouter>
  );
}

export default App;
