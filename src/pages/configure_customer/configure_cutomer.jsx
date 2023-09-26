import React from 'react';
import { useEffect, useState } from "react";

import Topbar from "../../components/topbar/topbar.jsx";
import { useNav } from "../../utilities/nav.js";
import { retrieve, save } from "../../utilities/storage.js";

import './configure_customer.css';

export default function ConfigureCustomer()
{
  const nav = useNav();

  const states = 
  [
    <option key='0'></option>,
    <option key='1'>AL</option>,
    <option key='2'>AK</option>,
    <option key='3'>AZ</option>,
    <option key='4'>AR</option>,
    <option key='5'>CA</option>,
    <option key='6'>CZ</option>,
    <option key='7'>CO</option>,
    <option key='8'>CT</option>,
    <option key='9'>DE</option>,
    <option key='10'>DC</option>,
    <option key='11'>FL</option>,
    <option key='12'>GA</option>,
    <option key='13'>GU</option>,
    <option key='14'>HI</option>,
    <option key='15'>ID</option>,
    <option key='16'>IL</option>,
    <option key='17'>IN</option>,
    <option key='18'>IA</option>,
    <option key='19'>KS</option>,
    <option key='20'>KY</option>,
    <option key='21'>LA</option>,
    <option key='22'>ME</option>,
    <option key='23'>MD</option>,
    <option key='24'>MA</option>,
    <option key='25'>MI</option>,
    <option key='26'>MN</option>,
    <option key='27'>MS</option>,
    <option key='28'>MO</option>,
    <option key='29'>MT</option>,
    <option key='30'>NE</option>,
    <option key='31'>NV</option>,
    <option key='32'>NH</option>,
    <option key='33'>NJ</option>,
    <option key='34'>NM</option>,
    <option key='35'>NY</option>,
    <option key='36'>NC</option>,
    <option key='37'>ND</option>,
    <option key='38'>OH</option>,
    <option key='39'>OK</option>,
    <option key='40'>OR</option>,
    <option key='41'>PA</option>,
    <option key='42'>PR</option>,
    <option key='43'>RI</option>,
    <option key='44'>SC</option>,
    <option key='45'>SD</option>,
    <option key='46'>TN</option>,
    <option key='47'>TX</option>,
    <option key='48'>UT</option>,
    <option key='49'>VT</option>,
    <option key='50'>VI</option>,
    <option key='51'>VA</option>,
    <option key='52'>WA</option>,
    <option key='53'>WV</option>,
    <option key='54'>WI</option>,
    <option key='55'>WY</option> 
  ];

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');

  useEffect(() =>
  {
    const customer = retrieve('customer') || 
    {
      id: -1,
      first_name: '',
      last_name: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zipcode: ''
    };

    setFirstName(customer.first_name);
    setLastName(customer.last_name);
    setEmail(customer.email);
    setAddress(customer.address);
    setCity(customer.city);
    setState(customer.state);
    setZipcode(customer.zipcode);
  }, []);

  const next = () =>
  {
    saveCustomerInfo();
    nav('/cover');
  }

  const clear = () =>
  {

  }

  const saveCustomerInfo = () =>
  {
    const customer = 
    {
      first_name: first_name, 
      last_name: last_name, 
      email: email, 
      address: address, 
      city: city, 
      state: state, 
      zipcode: zipcode
    }

    save('customer', customer);
  }

  return (
    <div id="page-container">
    <Topbar beforeBack={saveCustomerInfo}/>
      <div id="page-content">
        <div id="customer-form">
          <div className="input-section" id="customer-info-form">
            <div id="name-info">
              <div className="labeled-input">
                <label>First Name</label>
                <input 
                  type="text" 
                  id="first-name" 
                  value={first_name} 
                  onChange={event => setFirstName(event.target.value)}
                />
              </div>

              <div className="labeled-input">
                <label>Last Name</label>
                <input 
                  type="text" 
                  id="last-name"
                  value={last_name} 
                  onChange={event => setLastName(event.target.value)}
                />
              </div>

              <div className="labeled-input" id="email-input">
                <label>Email</label>
                <input 
                  type="text" 
                  id="email"
                  value={email} 
                  onChange={event => setEmail(event.target.value)}
                />
              </div>
            </div>

            <div id="address-info">
              <div className="labeled-input">
                <label>Address</label>
                <input 
                  type="text" 
                  id="address"
                  value={address}
                  onChange={event => setAddress(event.target.value)}
                />
              </div>

              <div className="labeled-input">
                <label>City</label>
                <input 
                  type="text" 
                  id="city"
                  value={city}
                  onChange={event => setCity(event.target.value)}
                />
              </div>
                    
              <div className="labeled-input" id="state-input">
                <label>State</label>
                <select 
                  name="state" 
                  id="state"
                  value={state}
                  onChange={event => setState(event.target.value)}
                >
                  { states }
                </select>
              </div>

              <div className="labeled-input" id="zipcode-input">
                <label>Zipcode</label>
                <input 
                  type="text" 
                  id="zipcode"
                  value={zipcode}
                  onChange={event => setZipcode(event.target.value)}
                />
              </div>
            </div>

            <div id="form-buttons">
              <button className="small-button" onClick={ clear }>Clear</button>
              <button className="small-button" onClick={ next }>Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}