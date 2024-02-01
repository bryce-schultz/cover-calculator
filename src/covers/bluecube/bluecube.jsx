import React, { useState, useEffect } from "react";
import Topbar from "../../components/topbar/topbar";
import { useNav } from "../../utilities/nav";
import ColorPicker from "../../components/color_picker/color_picker";
import '../covers.css';
import { RectangularCover } from "../../utilities/data_models/covers/covers";
import { retrieve, save } from "../../utilities/storage";
import units from "../../utilities/formatters/format_with_units";
import { getSettings } from "../../utilities/settings/settings";

// export the path
export const bluecube_path = "/bluecube";
export const bluecube_name = "Bluecube";

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

    draw()
    {
        
    }
}

// export the button
export function BluecubeButton()
{
    let nav = useNav();

    const handleClick = () => 
    {
        nav(bluecube_path);
    }

    return (
        <button className="cover-button" onClick={handleClick}>{bluecube_name}</button>
    );
}

// export the configuration page
export function BluecubeConfiguration()
{
    const nav = useNav();

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
        // in inches
        let width = 37.5;
        let length = 92.5;

        // convert to metric if necessary
        if (getSettings().units === 'metric')
        {
            width = width * 2.54;
            length = length * 2.54;
        }

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
                <div className='container'>
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