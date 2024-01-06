import React from 'react'; 
import Topbar from '../../components/topbar/topbar.jsx';
import './configure_cover.css';
import { StandardBifoldButton } from '../../covers/standard_bifold/standard_bifold.jsx';

export default function ConfigureCover()
{
  return (
    <div id='page-container'>
      <Topbar/>
      <div id='model-button-wrap'>
        <StandardBifoldButton/>
      </div>
    </div>
  );
}