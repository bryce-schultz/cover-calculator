import React, { useState, useRef, useEffect } from 'react';
import Topbar from '../../components/topbar/topbar';
import { useNav } from '../../utilities/nav';
import ColorPicker from '../../components/color_picker/color_picker';
import { Cover } from '../../utilities/data_models/covers/covers';
import { retrieve, save } from '../../utilities/storage';
import units from '../../utilities/formatters/format_with_units';
import '../covers.css';

// export the path
export const circular_path = '/circular';
export const circular_name = 'Circular';

// export the class
export class CircularCover extends Cover
{
    constructor(radius, panel_count, in_ground, color)
    {
        super(circular_name, color, in_ground);

        this.panel_count = panel_count;
        this.radius = radius;
    }

    static fromJson(cover)
    {
        let result = new CircularCover(
            cover.radius,
            cover.panel_count,
            cover.in_ground,
            cover.color);

        result.purchase_date = new Date(cover.purchase_date);

        return result;
    }

    getInfo()
    {
        return (
            <div>
                <div>
                    <div>
                        <strong>
                            { this.in_ground ? 'In Ground ' : '' }
                            { `${this.color} ` } 
                            { `${this.model} ` }
                        </strong>
                    </div>
                    <div>
                        <strong>Radius:</strong> { units(this.radius) }
                    </div>
                    <div>
                        <strong>Panel Count:</strong> { this.panel_count }
                    </div>
                </div>
            </div>
        );
    }

    draw()
    {
        
    }
}

// export the button
export function CircularButton()
{
    let nav = useNav();
    const mode = retrieve('mode');
    const cover = retrieve('cover');

    const handleClick = () => 
    {
        nav(circular_path);
    }

    return (
        <button 
            className='cover-button' 
            onClick={handleClick}
            disabled={mode === 'edit' && cover.model !== circular_name}
        >
            {circular_name}
        </button>
    );
}

// export the configuration page
export function CircularConfiguration()
{
    const nav = useNav();

    const [radius, setRadius] = useState('');
    const [panel_count, setPanelCount] = useState('');
    const [in_ground, setInGround] = useState(false);
    const [color, setColor] = useState('');

    const radius_ref = useRef(null);

    const clear = () =>
    {
        setRadius('');
        setPanelCount('');
        setInGround(false);
        setColor('');

        radius_ref.current.focus();
    }

    const loadCoverInfo = () =>
    {
        let cover = retrieve('cover');

        if (cover !== null && cover.model === circular_name)
        {
            cover = CircularCover.fromJson(cover);

            setRadius(cover.radius);
            setPanelCount(cover.panel_count);
            setInGround(cover.in_ground);
            setColor(cover.color);
        }
    }

    const saveCoverInfo = () =>
    {
        let cover = new CircularCover(
            Number(radius), 
            Number(panel_count),
            Boolean(in_ground),
            color === '' ? 'None' : color);

        save('cover', cover);
    }

    const next = () =>
    {
        saveCoverInfo();
        nav('/buildsheet');
    }

    useEffect(() =>
    {
        loadCoverInfo();
    }, []);

    return (
        <div id='page-container'>
            <Topbar beforeBack={saveCoverInfo}/>
            <div id='page-content'>
                <div className='page-title'>
                    <h1>Enter the {circular_name} Details</h1>
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='mb-3 col-12 col-md-6'>
                            <label htmlFor='ux-radius' className='form-label'>Radius</label>
                            <input
                                ref={radius_ref}
                                type='number' 
                                className='form-control' 
                                id='ux-width'
                                value={radius}
                                onChange={event => setRadius(event.target.value)}
                            />
                        </div>

                        <div className='mb-3 col-12 col-md-6'>
                            <label htmlFor='ux-panel-count' className='form-label'>Panel Count</label>
                            <input 
                                type='number' 
                                className='form-control' 
                                id='ux-panel-count'
                                value={panel_count}
                                onChange={event => setPanelCount(event.target.value)}
                            />
                        </div>

                        <div className='mb-3 col-12'>
                            <label htmlFor='ux-color-picker' className='form-label'>Color</label>
                            <ColorPicker value={color} onChange={value => setColor(value)}/>
                        </div>

                        <div className='col-12 col-md-3 col-lg-2'>
                            <div className='form-check'>
                                <input 
                                    className='form-check-input' 
                                    type='checkbox' 
                                    id='ux-in-ground'
                                    checked={in_ground}
                                    onChange={event => setInGround(event.target.checked)}
                                    />
                                <label className='form-check-label' htmlFor='ux-in-ground'>
                                    In Ground?
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className='text-center'>
                        <button type='button' className='btn btn-custom m-2' onClick={clear}>Clear</button>
                        <button type='submit' className='btn btn-custom m-2' onClick={next}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}