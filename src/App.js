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
import { StandardBifoldConfiguration, standard_path } from "./covers/standard_bifold/standard_bifold.jsx";
import BuildSheet from "./pages/build_sheet/build_sheet.jsx";

function App() 
{
  return (
    <HashRouter>
      <Routes>
        <Route path='/' exact       element={ <Home/> }/>
        <Route path='settings'      element={ <Settings/> }/>
        <Route path='open'          element={ <OpenExisting/>}/>
        <Route path='customer'      element={ <ConfigureCustomer/> }/>
        <Route path='cover'         element={ <ConfigureCover/> }/>
        <Route path={standard_path} element={ <StandardBifoldConfiguration/> }/>
        <Route path='buildsheet'    element={ <BuildSheet/> }/>
      </Routes>
    </HashRouter>
  );
}

export default App;
