import React from 'react';
import BackArrowNav from '../back_arrow_nav/back_arrow_nav.jsx';

import './topbar.css';

export default function Topbar(
{
    beforeBack
})
{
    return (
        <div id='topbar'>
            <div id='left'>
                <BackArrowNav beforeBack={beforeBack}/>
            </div>
            <div id='center'>
                
            </div>
            <div id='right'>
                
            </div>
        </div>
    );
}