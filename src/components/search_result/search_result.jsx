import React from 'react';
import { Icon } from '@iconify/react';
import userIcon from '@iconify/icons-mdi/user';
import roundEmail from '@iconify/icons-ic/round-email';
import { useState } from 'react';

import getCovers from '../../utilities/database/get_covers.js';
import CoverResult from '../cover_result/cover_result.jsx';
import Cover from '../../utilities/data_models/cover.js';

import './search_result.css';

export default function SearchResult(
{
  customer
})
{
  const [list_items, setListItems] = useState([]);
  const [covers_open, setCoversOpen] = useState(false);
  const [style, setStyle] = useState({ maxHeight: '0px' });

  const searchDatabase = async () =>
  {
    let covers = await getCovers(customer.id);

    if (covers.length !== 0)
    {
      setCoversOpen(true);
      setStyle({ maxHeight: '2000px' });
    }

    let items = covers.map((cover) =>
      <CoverResult
        key={cover.id}
        cover={ new Cover({...cover}) }
      />
    );

      setListItems(items);
  }

  const emptyList = () =>
  {
    setListItems([]);
    setCoversOpen(false);
    setStyle({ maxHeight: '0px' });
  }

  let button;

  if (covers_open)
  {
    button = <button onClick={ emptyList } className='red-button tall-button'>Hide Covers</button>;
  }
  else
  {
    button = <button onClick={ searchDatabase } className='green-button tall-button'>View Covers</button>;
  }

  return (
    <li className='list-item'>
      <div className='list-content-wrapper'>
        <div className='user-section'>
          <div className='info-section user-info-section'>
            <div className='icon-info name-section'>
              <Icon icon={userIcon}/>
              { customer.first_name } { customer.last_name }
            </div>
            <div className='icon-info email-section'>
              <Icon icon={roundEmail} />
              { customer.email }
            </div>
          </div>
          <div className='info-section location-info-section'>
            { customer.address } { customer.city }, { customer.state }. { customer.zipcode }
          </div>
          <div className='button-section'>
            { button }
          </div>
        </div>
        <div style={ style } className='cover-section'>
          { list_items }
        </div>
      </div>
    </li>
  );
}