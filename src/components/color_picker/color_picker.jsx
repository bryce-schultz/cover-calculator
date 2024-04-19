import React, { useEffect, useRef } from 'react';
import './color_picker.css';

export default function ColorPicker({ value, onChange })
{
    const mineralRef = useRef(null);
    const doveRef = useRef(null);
    const cinnamonRef = useRef(null);
    const minkRef = useRef(null);
    const forestRef = useRef(null);
    const customRef = useRef(null);
    const customInputRef = useRef(null);
    const previousValue = value;

    const clear = () =>
    {
        mineralRef.current.classList.remove('active');
        doveRef.current.classList.remove('active');
        cinnamonRef.current.classList.remove('active');
        minkRef.current.classList.remove('active');
        forestRef.current.classList.remove('active');
        customRef.current.classList.remove('active');
        customInputRef.current.value = '';
    }

    const change = (value) =>
    {
        if (onChange === undefined || onChange === null) return;
        if (typeof onChange !== 'function') return;

        if (value === previousValue) return;

        clear();
        onChange(value);
    }

    useEffect(() => 
    {
        if (value === undefined || value === null || value === '') return;

        if (value === 'Mineral')
        {
            clear();
            mineralRef.current.classList.add('active');
        }
        else if (value === 'Dove')
        {
            clear();
            doveRef.current.classList.add('active');
        }
        else if (value === 'Cinnamon')
        {
            clear();
            cinnamonRef.current.classList.add('active');
        }
        else if (value === 'Mink')
        {
            clear();
            minkRef.current.classList.add('active');
        }
        else if (value === 'Forest')
        {
            clear();
            forestRef.current.classList.add('active');
        }
        else
        {
            clear();
            customRef.current.classList.add('active');
            customInputRef.current.value = value;
        }
    });

    return (
        <div className='color-picker-container container'>
            <div className='row'>
                <div 
                    ref={mineralRef}
                    className='col-12 col-md-2 color-picker-color mineral'
                    onClick={ () => change('Mineral') }
                >
                    Mineral
                </div>

                <div
                    ref={doveRef} 
                    className='col-12 col-md-2 color-picker-color dove'
                    onClick={ () => change('Dove') }
                >
                    Dove
                </div>

                <div 
                    ref={cinnamonRef}
                    className='col-12 col-md-2 color-picker-color cinnamon'
                    onClick={ () => change('Cinnamon') }
                >
                    Cinnamon
                </div>

                <div
                    ref={minkRef} 
                    className='col-12 col-md-2 color-picker-color mink'
                    onClick={ () => change('Mink') }
                >
                    Mink
                </div>

                <div 
                    ref={forestRef}
                    className='col-12 col-md-2 color-picker-color forest'
                    onClick={ () => change('Forest') }
                >
                    Forest
                </div>

                <div
                    ref={customRef}
                    className='col-12 col-md-2 color-picker-color custom'
                    >
                    <div>
                        <label>Custom</label>
                        <input ref={customInputRef} type='text' onChange={ (event) => change(event.target.value) } className='form-control'></input>
                    </div>
                </div>
            </div>
        </div>
    );
}