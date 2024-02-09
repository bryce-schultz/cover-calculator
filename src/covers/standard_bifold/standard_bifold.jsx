import React, { useState, useRef, useEffect } from 'react';
import Topbar from '../../components/topbar/topbar';
import { useNav } from '../../utilities/nav';
import ColorPicker from '../../components/color_picker/color_picker';
import { RectangularCover } from '../../utilities/data_models/covers/covers';
import { retrieve, save } from '../../utilities/storage';
import units from '../../utilities/formatters/format_with_units';
import { getSettings } from '../../utilities/settings/settings';
import '../covers.css';

// export the path
export const standard_path = '/standard_bifold';
export const standard_name = 'Standard Bifold';

// export the class
export class StandardBifoldCover extends RectangularCover
{
    constructor(width, length, corner_radius, size_difference, in_ground, airs, color)
    {
        super(standard_name, color, in_ground, width, length, corner_radius);

        this.size_difference = size_difference;
        this.airs = airs;
    }

    static fromJson(cover)
    {
        let result = new StandardBifoldCover(
            cover.width,
            cover.length,
            cover.corner_radius,
            cover.size_difference,
            cover.in_ground,
            cover.airs,
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
                            { this.airs ? <>w/<em>A</em>irs </> : '' }
                        </strong>
                    </div>
                    <div>
                        <strong>Width &times; Length, Corner Radius:</strong> { units(this.width) } &times; { units(this.length) }, { units(this.corner_radius) }
                    </div>
                    <div>
                        <strong>Size Difference:</strong> { units(this.size_difference) }
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
export function StandardBifoldButton()
{
    let nav = useNav();
    const mode = retrieve('mode');
    const cover = retrieve('cover');

    console.log(mode, cover);

    const handleClick = () => 
    {
        nav(standard_path);
    }

    return (
        <button 
            className='cover-button' 
            onClick={handleClick} 
            disabled={mode === 'edit' && cover.model !== standard_name}
        >
            {standard_name}
        </button>
    );
}

// export the configuration page
export function StandardBifoldConfiguration()
{
    const nav = useNav();

    const [width, setWidth] = useState('');
    const [length, setLength] = useState('');
    const [corner_radius, setCornerRadius] = useState('');
    const [size_difference, setSizeDifference] = useState('');
    const [in_ground, setInGround] = useState(false);
    const [airs, setAirs] = useState(false);
    const [color, setColor] = useState('');

    const widthRef = useRef(null);

    const clear = () =>
    {
        setWidth('');
        setLength('');
        setCornerRadius('');
        setSizeDifference('');
        setInGround(false);
        setAirs(false);
        setColor('');

        widthRef.current.focus();
    }

    const loadCoverInfo = () =>
    {
        let cover = retrieve('cover');

        if (cover !== null && cover.model === standard_name)
        {
            cover = StandardBifoldCover.fromJson(cover);

            setWidth(cover.width);
            setLength(cover.length);
            setCornerRadius(cover.corner_radius);
            setSizeDifference(cover.size_difference);
            setInGround(cover.in_ground);
            setAirs(cover.airs);
            setColor(cover.color);
        }
    }

    const saveCoverInfo = () =>
    {
        let cover = new StandardBifoldCover(
            Number(width), 
            Number(length), 
            Number(corner_radius), 
            Number(size_difference), 
            Boolean(in_ground), 
            Boolean(airs), 
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
        getSettings();
    }, []);

    return (
        <div id='page-container'>
            <Topbar beforeBack={saveCoverInfo}/>
            <div id='page-content'>
                <div className='page-title'>
                    <h1>Enter the {standard_name} Details</h1>
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='mb-3 col-12 col-md-3'>
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

                        <div className='mb-3 col-12 col-md-3'>
                            <label htmlFor='ux-length' className='form-label'>Length</label>
                            <input 
                                type='number' 
                                className='form-control' 
                                id='ux-length'
                                value={length}
                                onChange={event => setLength(event.target.value)}
                            />
                        </div>

                        <div className='mb-3 col-12 col-md-3'>
                            <label htmlFor='ux-corner-radius' className='form-label'>Corner Radius</label>
                            <input 
                                type='text' 
                                className='form-control' 
                                id='ux-corner-radius'
                                value={corner_radius}
                                onChange={event => setCornerRadius(event.target.value)}
                            />
                        </div>

                        <div className='mb-3 col-12 col-md-3'>
                            <label htmlFor='ux-size-difference' className='form-label'>Size Difference</label>
                            <input 
                                type='text' 
                                className='form-control' 
                                id='ux-size-difference'
                                value={size_difference}
                                onChange={event => setSizeDifference(event.target.value)}
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

                        <div className='mb-3 col-12 col-md-9 col-lg-10'>
                            <div className='form-check'>
                                <input 
                                    className='form-check-input' 
                                    type='checkbox' 
                                    value='' 
                                    id='ux-airs'
                                    checked={airs}
                                    onChange={event => setAirs(event.target.checked)}
                                    />
                                <label className='form-check-label' htmlFor='ux-airs'>
                                    <i>A</i>irs?
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