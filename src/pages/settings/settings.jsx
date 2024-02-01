import React, { useState } from 'react';

import Topbar from "../../components/topbar/topbar";
import { getSettings, saveSettings } from '../../utilities/settings/settings';


export default function Settings()
{
  const [units, setUnits] = useState(getSettings().units);
  const [precision, setPrecision] = useState(getSettings().precision);

  return (
    <div id="page-container">
      <Topbar beforeBack={() => 
        {
          saveSettings(
          {
            units: units, 
            precision: precision
          });
        }}
      />
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
                  value={precision}
                  onChange={event => setPrecision(event.target.value)}
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