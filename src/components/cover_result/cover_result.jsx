import React from 'react';
import { Icon } from '@iconify/react';
import dateRangeRounded from '@iconify/icons-material-symbols/date-range-rounded';

import { FormattedCoverInfo } from '../../utilities/data_models/cover.js';
import './cover_result.css';

export default function CoverResult({
  cover
})
{
  const openBuildsheet = () =>
  {
    alert('This opens the build sheet');
  }

  return (
    <div className='cover-info-wrapper'>
      <div className='padded-cover-info'>
        <div className='date-wrapper'>
          <Icon icon={dateRangeRounded} />
          {cover.purchase_date}
        </div>
        <div className='formatted-info-wrapper'>
          <FormattedCoverInfo cover={cover}/>
        </div>
        <div className='button-wrapper'>
          <button onClick={openBuildsheet} className='green-button'>View Buildsheet</button>
        </div>
      </div>
    </div>
  );
}