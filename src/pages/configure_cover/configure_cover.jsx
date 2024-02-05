import React from 'react'; 
import Topbar from '../../components/topbar/topbar.jsx';
import './configure_cover.css';
import { StandardBifoldButton } from '../../covers/standard_bifold/standard_bifold.jsx';
import { BluecubeButton } from '../../covers/bluecube/bluecube.jsx';
import { SwimSpaCoverButton } from '../../covers/swimspa/swimspa.jsx';

export default function ConfigureCover()
{
  return (
    <div id='page-container'>
      <Topbar/>
      <div className='page-title'><h1>Choose a Model</h1></div>
      <div id='model-button-wrap'>
        <StandardBifoldButton/>
        <SwimSpaCoverButton/>
        <BluecubeButton/>
      </div>
    </div>
  );
}