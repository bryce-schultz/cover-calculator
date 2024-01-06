import React, {useEffect, useRef, useState} from 'react';
import './color_picker.css';

export default function ColorPicker({onChange})
{
    const mineralRef = useRef(null);
    const doveRef = useRef(null);
    const cinnamonRef = useRef(null);
    const minkRef = useRef(null);
    const forestRef = useRef(null);
    const customRef = useRef(null);
    const customInputRef = useRef(null);

    const [value, setValue] = useState('');

    const clear = () =>
    {
        mineralRef.current.classList.remove('active');
        doveRef.current.classList.remove('active');
        cinnamonRef.current.classList.remove('active');
        minkRef.current.classList.remove('active');
        forestRef.current.classList.remove('active');
        customRef.current.classList.remove('active');
    }

    const handleChange = (event) =>
    {
        event.stopPropagation();
        if (event.target instanceof HTMLInputElement)
        {
            clear();
            setValue(event.target.value);
            customRef.current.classList.add('active');
        }
        else
        {
            setValue(event.target.innerText);
            clear();
            customInputRef.current.value = '';
            event.target.classList.add('active');
        }
    }

    useEffect(() => 
    {
        if (onChange !== undefined)
            onChange(value);
    }, [value]);

    return (
        <div className='color-picker-container container'>
            <div className='row'>
                <div 
                    ref={mineralRef}
                    className='col-12 col-md-2 color-picker-color mineral'
                    onClick={ event => handleChange(event)}
                >
                    Mineral
                </div>

                <div
                    ref={doveRef} 
                    className='col-12 col-md-2 color-picker-color dove'
                    onClick={ event => handleChange(event)}
                >
                    Dove
                </div>

                <div 
                    ref={cinnamonRef}
                    className='col-12 col-md-2 color-picker-color cinnamon'
                    onClick={ event => handleChange(event)}
                >
                    Cinnamon
                </div>

                <div
                    ref={minkRef} 
                    className='col-12 col-md-2 color-picker-color mink'
                    onClick={ event => handleChange(event)}
                >
                    Mink
                </div>

                <div 
                    ref={forestRef}
                    className='col-12 col-md-2 color-picker-color forest'
                    onClick={ event => handleChange(event)}
                >
                    Forest
                </div>

                <div
                    ref={customRef}
                    className='col-12 col-md-2 color-picker-color custom'
                    >
                    <div>
                        <label>Custom</label>
                        <input ref={customInputRef} type='text' onChange={event => handleChange(event)} className='form-control'></input>
                    </div>
                </div>
            </div>
        </div>
    );
}