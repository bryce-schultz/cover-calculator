import React, { useState } from 'react';

import Topbar from "../../components/topbar/topbar.jsx";
import { getSettings } from '../../utilities/settings/settings.jsx';

export default function Settings()
{

  const [units, setUnits] = useState(getSettings().units);

  return (
    <div id="page-container">
      <Topbar/>
      <div className="page-title"><h1>Settings</h1></div>
      <div id='page-content'>
        <div className='container'>
          <div className='row'>
            <div className='mb-3 col-12'>
              <label htmlFor='ux-precision' className='form-label'>Decimal Point Accuracy</label>
              <input 
                  type='text' 
                  className='form-control' 
                  id='ux-corner-radius'
              />
            </div>

            <div className='mb-3 col-12'>
              <label htmlFor='ux-precision' className='form-label'>Units</label>
              <select 
                id='ux-state' 
                className="form-select"
                value={units}
                onChange={event => setUnits(event.target.value)}
              >
                <option value='imperial'>Imperial</option>
                <option value='metric'>Metric</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}