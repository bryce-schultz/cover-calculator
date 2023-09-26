import React from 'react';
import { Icon } from '@iconify/react';
import SettingsIcon from '@iconify/icons-bi/gear-fill';

import { useNav } from '../../utilities/nav.js';

import './settings_button.css';

function SettingsButton()
{
    const nav = useNav();

    const openSettings = () =>
    {
        nav('/settings');
    }
    
    return (
        <button id="settings" onClick={ openSettings }>
            <Icon icon={SettingsIcon}/>
        </button>
    );
}

export default SettingsButton;