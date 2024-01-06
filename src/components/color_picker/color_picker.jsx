import React, {useEffect, useRef, useState} from 'react';
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

    const [ivalue, setIValue] = useState('');

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

    useEffect(() =>
    {
        if (value === undefined || value === null || value === 'None') return;

        if (value === '') 
        {
            clear();
            return;
        }

        setIValue(value);

    }, [value]);

    useEffect(() => 
    {
        if (ivalue === 'Mineral')
        {
            clear();
            mineralRef.current.classList.add('active');
        }
        else if (ivalue === 'Dove')
        {
            clear();
            doveRef.current.classList.add('active');
        }
        else if (ivalue === 'Cinnamon')
        {
            clear();
            cinnamonRef.current.classList.add('active');
        }
        else if (ivalue === 'Mink')
        {
            clear();
            minkRef.current.classList.add('active');
        }
        else if (ivalue === 'Forest')
        {
            clear();
            forestRef.current.classList.add('active');
        }
        else
        {
            clear();
            customRef.current.classList.add('active');
            customInputRef.current.value = ivalue;
        }

        if (onChange !== undefined)
        {
            onChange(ivalue);
        }
    }, [ivalue]);

    return (
        <div className='color-picker-container container'>
            <div className='row'>
                <div 
                    ref={mineralRef}
                    className='col-12 col-md-2 color-picker-color mineral'
                    onClick={ () => setIValue('Mineral') }
                >
                    Mineral
                </div>

                <div
                    ref={doveRef} 
                    className='col-12 col-md-2 color-picker-color dove'
                    onClick={ () => setIValue('Dove') }
                >
                    Dove
                </div>

                <div 
                    ref={cinnamonRef}
                    className='col-12 col-md-2 color-picker-color cinnamon'
                    onClick={ () => setIValue('Cinnamon') }
                >
                    Cinnamon
                </div>

                <div
                    ref={minkRef} 
                    className='col-12 col-md-2 color-picker-color mink'
                    onClick={ () => setIValue('Mink') }
                >
                    Mink
                </div>

                <div 
                    ref={forestRef}
                    className='col-12 col-md-2 color-picker-color forest'
                    onClick={ () => setIValue('Forest') }
                >
                    Forest
                </div>

                <div
                    ref={customRef}
                    className='col-12 col-md-2 color-picker-color custom'
                    >
                    <div>
                        <label>Custom</label>
                        <input ref={customInputRef} type='text' onChange={ (event) => setIValue(event.target.value) } className='form-control'></input>
                    </div>
                </div>
            </div>
        </div>
    );
}