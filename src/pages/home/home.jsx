import React from 'react'; 
import { Icon } from '@iconify/react';
import AddIcon from '@iconify/icons-material-symbols/add';
import OpenIcon from '@iconify/icons-ic/baseline-file-open';

import LargeSquareButton from '../../components/large_square_button/large_square_button.jsx';
import SettingsButton from '../../components/settings_button/settings_button.jsx';
import { useNav } from '../../utilities/nav.js';

import './home.css';

function Home()
{
  let nav = useNav();

  const openExisting = () =>
  {
      nav('/open');
  }

  const next = () =>
  {
    nav('/customer');
  }

  return (
    <div id='page-container'>
      <div id='home-button-container'>
        <LargeSquareButton onClick={ next }>
            <Icon icon={AddIcon} width='3em'/>
            New Cover
          </LargeSquareButton>
          
          <LargeSquareButton onClick={ openExisting }>
            <Icon icon={OpenIcon} width='3em'/>
            Open Existing
          </LargeSquareButton>
      </div>
      <SettingsButton/>
    </div>
  );
}

export default Home;