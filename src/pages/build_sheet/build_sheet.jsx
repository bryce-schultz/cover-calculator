import { useEffect, useState, useRef } from 'react';
import { retrieve } from '../../utilities/storage';
import Topbar, { TopbarButton } from '../../components/topbar/topbar';
import { Customer } from '../../utilities/data_models/covers/covers';
import { save } from '../../utilities/storage';

// covers
import { StandardBifoldCover, standard_name } from '../../covers/standard_bifold/standard_bifold';
import { SwimSpaCover, swimspa_name } from '../../covers/swimspa/swimspa';
import { BluecubeCover, bluecube_name } from '../../covers/bluecube/bluecube';
import { CircularCover, circular_name } from '../../covers/circular/circular';
import { addCustomer } from '../../utilities/database/add_customer';
import { addCover } from '../../utilities/database/add_cover';

import './build_sheet.css';
import SVGCanvas from '../../components/canvas/svgcanvas';
import { useNav } from '../../utilities/nav';


// customer resolver
function getCustomer()
{
    let customer = retrieve('customer');
    if (customer === null)
    {
        customer = new Customer();
    }
    else 
    {
        customer = Customer.fromJson(customer);
    }

    return customer;
}

// cover type resolver
function getCover()
{
    let cover = retrieve('cover');

    if (cover === null || cover === undefined) return null;

    if (cover.model === standard_name)
    {
        cover = StandardBifoldCover.fromJson(cover);
    }
    else if (cover.model === swimspa_name)
    {
        cover = SwimSpaCover.fromJson(cover);
    }
    else if (cover.model === circular_name)
    {
        cover = CircularCover.fromJson(cover);
    }
    else if (cover.model === bluecube_name)
    {
        cover = BluecubeCover.fromJson(cover);
    }

    return cover;
}

export default function BuildSheet()
{
    const [scale, setScale] = useState(Number(retrieve('scale')) || 100);
    const notesRef = useRef(null);
    const successToastRef = useRef(null);

    const nav = useNav();

    const cover = getCover();
    const customer = getCustomer();

    const printPage = () =>
    {
        window.print();
    }

    const saveToDatabase = async () =>
    {
        await addCustomer(customer);
        await addCover(customer, cover);

        successToastRef.current.style.visibility = 'visible';

        setTimeout(() =>
        {
            if (successToastRef.current === null) return;
            successToastRef.current.style.visibility = 'hidden';
        }, 3000);
    }

    const hideToast = () =>
    {
        successToastRef.current.style.visibility = 'hidden';
    }

    const saveNotes = () =>
    {
        let notes = notesRef.current.innerText;
        save('notes', notes);
    }

    useEffect(() =>
    {
        if (notesRef.current === null) return;
        
        let notes = retrieve('notes');
        if (notes !== null)
        {
            notesRef.current.innerText = notes;
        }
    }, []);

    useEffect(() => 
    {
        if (cover !== null)
        {
            cover.draw();
        }
    }, [cover]);

    useEffect(() =>
    {
        save('scale', Number(scale));
    }, [scale]);

    return (
        <div id='page-container'>
            <div ref={successToastRef} className="toast-message">
                <div className="d-flex">
                    <div className="toast-body">
                        Saved Successfully.
                    </div>
                    <button onClick={hideToast} type="button" className="btn-close btn-close-white ms-2 m-auto"></button>
                </div>
            </div>

            <Topbar beforeBack={saveNotes}>
                <TopbarButton onClick={printPage} tooltip="Print">
                    <span className="material-symbols-outlined">
                        print
                    </span>
                </TopbarButton>

                <TopbarButton onClick={saveToDatabase} tooltip="Save">
                    <span className="material-symbols-outlined">
                        save
                    </span>
                </TopbarButton>

                <TopbarButton onClick={() => {setScale(Number(scale) - 10)}} tooltip="Zoom Out">
                    <span className="material-symbols-outlined">
                        remove
                    </span>
                </TopbarButton>
                <input type='number' className='zoom-level-display' value={scale} onChange={(event) => {setScale(event.target.value)}}/>
                <TopbarButton onClick={() => {setScale(Number(scale) + 10)}} tooltip="Zoom In">
                    <span className="material-symbols-outlined">
                        add
                    </span>
                </TopbarButton>

                <TopbarButton onClick={() => {nav('/')}} tooltip="Zoom Out">
                    <span className="material-symbols-outlined">
                        home
                    </span>
                </TopbarButton>
            </Topbar>

            <div id='page-content'>
                <div id='paper-wrapper'>
                    <div id='build-sheet-paper' style={{transform: `scale(${scale/100})`, transformOrigin: 'top center'}}>
                        <div id='build-sheet-header' className='mb-3'>
                            <div><h1>Airframe</h1><h2>Spa Covers</h2></div>
                            {customer !== null && customer.getInfo()}
                        </div>
                        <div id='build-sheet-info'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th scope="col">Cover Information</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td id='build-sheet-cover-info'>{cover !== null && cover.getInfo()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <div id='build-sheet-cover-drawing-wrapper'>
                            <div id='build-sheet-cover-drawing'>
                                <SVGCanvas draw={cover.draw}/>
                            </div>
                        </div>

                        <hr/>

                        <div id='build-sheet-notes-wrapper'>
                            <div id='build-sheet-notes-title'>
                                Notes:
                                </div>  
                            <div ref={notesRef} id='build-sheet-notes' contentEditable='true'>
                                { /* Editable notes area */ }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}