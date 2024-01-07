import React from 'react';
import BackArrowNav from '../back_arrow_nav/back_arrow_nav.jsx';

import './topbar.css';

export default function Topbar(
{
    beforeBack,
    children
})
{
    return (
        <div id='topbar'>
            <div id='left'>
                <BackArrowNav beforeBack={beforeBack}/>
            </div>
            <div id='center'>
                {children}
            </div>
            <div id='right'>
                
            </div>
        </div>
    );
}

export function TopbarButton(
{
    onClick,
    children,
    tooltip
})
{
    return (
        <button title={tooltip ? tooltip : ''} className='topbar-button' onClick={onClick}>{children}</button>
    );
}