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
    constructor(panel_count, in_ground, color)
    {
        super(circular_name, color, in_ground, width, length, corner_radius);

        this.panel_count = panel_count;
        this.taper_direction = taper_direction;
    }

    static fromJson(cover)
    {
        let result = new SwimSpaCover(
            cover.width,
            cover.length,
            cover.panel_count,
            cover.taper_direction,
            cover.corner_radius,
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
                        <strong>Width &times; Length, Corner Radius:</strong> { units(this.width) } &times; { units(this.length) }, { units(this.corner_radius) }
                    </div>
                    <div>
                        <strong>Panel Count:</strong> { this.panel_count }
                    </div>
                    <div>
                        <strong>Taper Direction:</strong> { this.taper_direction === 'width' ? 'Width Ways' : 'Length Ways' }
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
export function SwimSpaCoverButton()
{
    let nav = useNav();

    const handleClick = () => 
    {
        nav(circular_path);
    }

    return (
        <button className='cover-button' onClick={handleClick}>{circular_name}</button>
    );
}

// export the configuration page
export function SwimSpaConfiguration()
{
    const nav = useNav();

    const [width, setWidth] = useState('');
    const [length, setLength] = useState('');
    const [panel_count, setPanelCount] = useState('');
    const [taper_direction, setTaperDirection] = useState('width');
    const [corner_radius, setCornerRadius] = useState('');
    const [in_ground, setInGround] = useState(false);
    const [color, setColor] = useState('');

    const widthRef = useRef(null);

    const clear = () =>
    {
        setWidth('');
        setLength('');
        setCornerRadius('');
        setPanelCount('');
        setTaperDirection('width');
        setInGround(false);
        setColor('');

        widthRef.current.focus();
    }

    const loadCoverInfo = () =>
    {
        let cover = retrieve('cover');

        if (cover !== null && cover.model === circular_name)
        {
            cover = SwimSpaCover.fromJson(cover);

            setWidth(cover.width);
            setLength(cover.length);
            setPanelCount(cover.panel_count);
            setTaperDirection(cover.taper_direction);
            setCornerRadius(cover.corner_radius);
            setInGround(cover.in_ground);
            setColor(cover.color);
        }
    }

    const saveCoverInfo = () =>
    {
        let cover = new SwimSpaCover(
            Number(width), 
            Number(length),
            Number(panel_count),
            taper_direction, 
            Number(corner_radius),
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
                <div className='container'>
                    <div className='row'>
                        <div className='mb-3 col-12 col-md-4'>
                            <label htmlFor='ux-width' className='form-label'>Width</label>
                            <input
                                ref={widthRef}
                                type='number' 
                                className='form-control' 
                                id='ux-width'
                                value={width}
                                onChange={event => setWidth(event.target.value)}
                            />
                        </div>

                        <div className='mb-3 col-12 col-md-4'>
                            <label htmlFor='ux-length' className='form-label'>Length</label>
                            <input 
                                type='number' 
                                className='form-control' 
                                id='ux-length'
                                value={length}
                                onChange={event => setLength(event.target.value)}
                            />
                        </div>

                        <div className='mb-3 col-12 col-md-4'>
                            <label htmlFor='ux-corner-radius' className='form-label'>Corner Radius</label>
                            <input 
                                type='text' 
                                className='form-control' 
                                id='ux-corner-radius'
                                value={corner_radius}
                                onChange={event => setCornerRadius(event.target.value)}
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

                        <div className='mb-3 col-12 col-md-6'>
                            <label htmlFor='ux-length' className='form-label'>Taper Direction</label>
                            <select 
                                id='ux-taper-direction' 
                                className='form-select'
                                value={taper_direction}
                                onChange={event => setTaperDirection(event.target.value)}
                            >
                                <option value='length'>
                                    Long Ways
                                </option>

                                <option value='width'>
                                    Width Ways
                                </option>
                            </select>
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