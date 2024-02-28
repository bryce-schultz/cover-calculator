import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import dateRangeRounded from '@iconify/icons-material-symbols/date-range-rounded';

import './cover_result.css';
import { deleteCoverById } from '../../utilities/database/add_cover.js';
import { useNav } from '../../utilities/nav.js';
import { save } from '../../utilities/storage.js';

export default function CoverResult({
  customer,
  cover
})
{
  const nav = useNav();
  const [exists, setExists] = useState(true);

  const openBuildsheet = () =>
  {
    save('customer', customer);
    save('cover', cover);
    nav('/customer');
  }

  const deleteCover = () =>
  {
    deleteCoverById(cover.id);
    setExists(false);
  }

  return (
    <>
    { exists &&
      <div className='cover-info-wrapper'>
        <div className='padded-cover-info'>
          <div className='date-wrapper'>
            <Icon icon={dateRangeRounded}/>&nbsp;
            {cover.purchase_date}
          </div>
          <div className='formatted-info-wrapper'>
            {cover.in_ground ? 'In Ground |' : 'Above Ground |'} {cover.color} | {cover.model}
          </div>
          <div className='button-wrapper'>
            <button onClick={openBuildsheet} className='green-button'>View Buildsheet</button>
          </div>
          <div className='button-wrapper'>
            <button onClick={deleteCover} className='red-button'>
              <span className="material-symbols-outlined">
                delete
              </span>
            </button>
          </div>
        </div>
      </div>
    }
    </>
  );
}