import React from 'react';
import { Icon } from '@iconify/react';
import BackArrow from '@iconify/icons-material-symbols/arrow-back-ios-new';

import { useBack } from '../../utilities/nav.js';

import './back_arrow_nav.css';

export default function BackArrowNav(
{
  beforeBack
})
{
  const back = useBack();

  const goBack = () =>
  {
    if (beforeBack !== undefined)
    {
      beforeBack(); 
    }

    back();
  }

  return (
    <div id='back-arrow-wrapper' onClick={goBack}>
        <Icon icon={BackArrow} width='2em' color='var(--text-muted)'/>
    </div>
  );
}