import React from 'react';
import { useState, useEffect } from "react";

import Topbar from "../../components/topbar/topbar.jsx";
import SearchBar from "../../components/search_bar/search_bar.jsx";
import getCustomers from "../../utilities/database/get_customers.js";
import Customer from "../../utilities/data_models/customer.js";
import SearchResult from "../../components/search_result/search_result.jsx";

import './open_existing.css';

export default function OpenExisting()
{
  const [list_items, setListItems] = useState([]);

  const searchDatabase = async (query) =>
  {
    let customers = await getCustomers(query);

    if (customers === undefined) return;
    
    customers.sort((first, second) => 
    {
      if (first.first_name > second.first_name) 
      {
         return 1;
      }
      else if (first.first_name < second.first_name) 
      {
         return -1;
      }

      return 0;
    });

    let items = customers.map((customer) => 
      <SearchResult 
        key={ customer.id }
        customer={ new Customer({...customer}) }
      />
    );

      setListItems(items);
  };

  useEffect(()=>{
    searchDatabase('');
  }, []);

  return (
    <div id='page-container'>
      <Topbar/>
      <div id='page-content'>
        <div id='narrow-content'>
          <div id='form-wrapper'>
            <div id='top-form'>
              <SearchBar onSearch={ searchDatabase }/>
            </div>
            <div id='spacer'></div>
            <div id='form-results'>
              <ul id='result-list'>
                { list_items }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}