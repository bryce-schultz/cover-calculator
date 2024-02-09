import React from 'react'; 
import Topbar from '../../components/topbar/topbar.jsx';
import './configure_cover.css';
import { StandardBifoldButton } from '../../covers/standard_bifold/standard_bifold.jsx';
import { BluecubeButton } from '../../covers/bluecube/bluecube.jsx';
import { SwimSpaCoverButton } from '../../covers/swimspa/swimspa.jsx';
import { CircularButton } from '../../covers/circular/circular.jsx';

export default function ConfigureCover()
{
  return (
    <div id='page-container'>
      <Topbar/>
      <div id='page-content'>
        <div className='page-title'>
          <h1>Choose a Model</h1>
        </div>
        <div className='container'>
          <div className='row'>
            <div className='mb-3 col-12'>
              <StandardBifoldButton/>
            </div>
            <div className='mb-3 col-12'>
              <SwimSpaCoverButton/>
            </div>
            <div className='mb-3 col-12'>
              <CircularButton/>
            </div>
            <div className='mb-3 col-12'>
              <BluecubeButton/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}