import React, { useState, useEffect } from "react";
import Topbar from "../../components/topbar/topbar";
import { useNav } from "../../utilities/nav";
import ColorPicker from "../../components/color_picker/color_picker";
import '../covers.css';
import { RectangularCover } from "../../utilities/data_models/covers/covers";
import { retrieve, save } from "../../utilities/storage";
import units from "../../utilities/formatters/format_with_units";
import { drawPoly, drawText } from '../../components/canvas/svgcanvas';
import { applyScale } from '../../utilities/utils';

// export the path
export const bluecube_path = "/bluecube";
export const bluecube_name = "BlueCube";

// export the class
export class BluecubeCover extends RectangularCover
{
    constructor(width, length, corner_radius, in_ground, color)
    {
        super(bluecube_name, color, in_ground, width, length, corner_radius);
    }

    static fromJson(cover)
    {
        let result = new BluecubeCover(
            cover.width,
            cover.length,
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
                            { `${this.color} ` } 
                            { `${this.model} ` } 
                        </strong>
                    </div>
                    <div>
                        <strong>Width &times; Length:</strong> { units(this.width) } &times; { units(this.length) }
                    </div>
                </div>
            </div>
        );
    }

    draw(svg, width, height)
    {
        if (!svg) return;

        const font_size = 12;

        const bubble_thickness = 0.125;
        const double_bubble_thickness = 0.25;

        const frame_length = this.length - (2 * bubble_thickness + 2 * double_bubble_thickness);
        const frame_width = this.width - (2 * double_bubble_thickness);

        const size_difference = 3.5/2;

        const scale = Math.min(width / frame_length, height / frame_width);

        const coupler_width = frame_width;
        const coupler_length = (frame_length / 2) + size_difference;

        const complimentary_length = (frame_length / 2) - size_difference;

        // coupler side
        const coupler_points = [
            [1, 1],
            [coupler_length, 1],
            [coupler_length, coupler_width],
            [1, coupler_width],
            [1, coupler_width]
        ];

        // complimentary side
        const complimentary_points = [
            [coupler_length, 1],
            [coupler_length + complimentary_length - 2, 1],
            [coupler_length + complimentary_length - 2, coupler_width],
            [coupler_length, coupler_width]
        ];

        // draw the frame
        drawPoly(svg, applyScale(coupler_points, scale), 'transparent', 'black');
        drawPoly(svg, applyScale(complimentary_points, scale), 'transparent', 'black');

        // coupler length text
        drawText(svg, 
            coupler_length * scale / 2, 
            font_size + 6, 
            `${units(coupler_length)}`);
        
        // complimentary length text
        drawText(svg, 
            coupler_length * scale + (complimentary_length * scale / 2), 
            font_size + 6, 
            `${units(complimentary_length)}`);
        
        // back rail width text
        drawText(svg, 
            8, 
            coupler_width * scale / 2, 
            `${units(coupler_width)}`);

        // front rail width text
        drawText(svg, 
            coupler_length * scale + 2, 
            coupler_width * scale / 2, 
            `${units(frame_width)}`);
    }
}

// export the button
export function BluecubeButton()
{
    let nav = useNav();
    const mode = retrieve('mode');
    const cover = retrieve('cover');

    const handleClick = () => 
    {
        nav(bluecube_path);
    }

    return (
        <button 
            className="cover-button" 
            onClick={handleClick}
            disabled={mode === 'edit' && cover.model !== bluecube_name}
        >
            {bluecube_name}
        </button>
    );
}

// export the configuration page
export function BluecubeConfiguration()
{
    const nav = useNav();

    // in inches
    const width = 37.5;
    const length = 92.5;

    const [color, setColor] = useState('');

    const clear = () =>
    {
        setColor('');
    }

    const loadCoverInfo = () =>
    {
        let cover = retrieve('cover');

        if (cover !== null && cover.model === bluecube_name)
        {
            cover = BluecubeCover.fromJson(cover);

            setColor(cover.color);
        }
    }

    const saveCoverInfo = () =>
    {
        let cover = new BluecubeCover(
            width, 
            length, 
            0, 
            false, 
            color === "" ? "None" : color);

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
                    <h1>Enter the {bluecube_name} Details</h1>
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='mb-3 col-12'>
                            <label htmlFor='ux-size-option-picker' className='form-label'>Sizes</label>
                            <div id='ux-size-option-picker'>
                                <button className='ux-size-option-button active'>{ units(width) } &times; { units(length) }</button>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='mb-3 col-12'>
                            <label htmlFor='ux-color-picker' className='form-label'>Color</label>
                            <ColorPicker value={color} onChange={value => setColor(value)}/>
                        </div>
                    </div>

                    <div className='text-center'>
                        <button type="button" className="btn btn-custom m-2" onClick={clear}>Clear</button>
                        <button type="submit" className="btn btn-custom m-2" onClick={next}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}