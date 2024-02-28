import React, { useState, useRef, useEffect } from 'react';
import Topbar from '../../components/topbar/topbar';
import { useNav } from '../../utilities/nav';
import ColorPicker from '../../components/color_picker/color_picker';
import { RectangularCover } from '../../utilities/data_models/covers/covers';
import { retrieve, save } from '../../utilities/storage';
import units from '../../utilities/formatters/format_with_units';
import '../covers.css';
import { drawPoly, drawText } from '../../components/canvas/svgcanvas';
import { applyScale, calcCorner } from '../../utilities/utils';

// export the path
export const swimspa_path = '/swimspa';
export const swimspa_name = 'Swim Spa';

// export the class
export class SwimSpaCover extends RectangularCover
{
    constructor(width, length, panel_count, taper_direction, corner_radius, in_ground, color)
    {
        super(swimspa_name, color, in_ground, width, length, corner_radius);

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

    draw(svg, width, height)
    {
        if (!svg) return;

        const corner = calcCorner(this.corner_radius);
        const font_size = 12;

        const double_bubble_thickness = 0.25;

        const frame_length = this.length - (2*double_bubble_thickness*this.panel_count);
        const frame_width = this.width - (2 * double_bubble_thickness);
        const panel_length = frame_length / this.panel_count;

        const scale = Math.min(width / frame_length, height / frame_width);

        for (let i = 0; i < this.panel_count; i++)
        {
            let points = [];
            
            // first panel
            if (i === 0)
            {
                points = [
                    [corner, 0],
                    [panel_length, 0],
                    [panel_length, frame_width],
                    [corner, frame_width],
                    [0, frame_width - corner],
                    [0, corner]
                ];

                // corner radius text
                if (corner > 0)
                {
                    drawText(svg,                               // svg
                        corner * scale / 2 + 6,                 // x
                        corner * scale / 2 + font_size + 4,     // y
                        `${units(this.corner_radius)}`);        // text
                }

                drawText(svg,
                    (panel_length / 2) * scale,
                    (font_size + 2),
                    `${units(panel_length - corner)}`);

                drawText(svg,
                    8,
                    (frame_width / 2) * scale,
                    `${units(frame_width - (2 * corner))}`);
                
                drawText(svg,
                    panel_length * scale + 8,
                    (frame_width / 2) * scale,
                    `${units(frame_width)}`);
            }
            // last panel
            else if (i === this.panel_count - 1)
            {
                points = [
                    [i * panel_length, 0],
                    [(i + 1) * panel_length - corner, 0],
                    [(i +1 ) * panel_length, corner],
                    [(i + 1) * panel_length, frame_width - corner],
                    [(i + 1) * panel_length - corner, frame_width],
                    [i * panel_length, frame_width]
                ];

                drawText(svg,
                    (i * panel_length + panel_length / 2) * scale,
                    (font_size + 2),
                    `${units(panel_length - corner)}`);
            }
            // middle panels
            else
            {
                points = [
                    [i * panel_length, 0],
                    [(i + 1) * panel_length, 0],
                    [(i + 1) * panel_length, frame_width],
                    [i * panel_length, frame_width],
                ];

                drawText(svg,
                    (i * panel_length + panel_length / 2) * scale,
                    (font_size + 2),
                    `${units(panel_length)}`);
            }

            drawPoly(svg, applyScale(points, scale), 'none', 'black');
        }
    }
}

// export the button
export function SwimSpaCoverButton()
{
    let nav = useNav();
    const mode = retrieve('mode');
    const cover = retrieve('cover');

    const handleClick = () => 
    {
        nav(swimspa_path);
    }

    return (
        <button 
            className='cover-button' 
            onClick={handleClick}
            disabled={mode === 'edit' && cover.model !== swimspa_name}
        >
            {swimspa_name}
        </button>
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

        if (cover !== null && cover.model === swimspa_name)
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
                <div className='page-title'>
                    <h1>Enter the {swimspa_name} Details</h1>
                </div>
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