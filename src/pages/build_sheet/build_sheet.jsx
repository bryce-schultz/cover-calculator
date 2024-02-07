import { useEffect } from 'react';
import { retrieve } from '../../utilities/storage';
import Topbar, { TopbarButton } from '../../components/topbar/topbar';
import { Customer } from '../../utilities/data_models/covers/covers';

// covers
import { StandardBifoldCover, standard_name } from '../../covers/standard_bifold/standard_bifold';
import { SwimSpaCover, swimspa_name } from '../../covers/swimspa/swimspa';
import { BluecubeCover, bluecube_name } from '../../covers/bluecube/bluecube';

import './build_sheet.css';

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

    console.log(cover.model)

    if (cover.model === standard_name)
    {
        cover = StandardBifoldCover.fromJson(cover);
    }
    else if (cover.model === swimspa_name)
    {
        cover = SwimSpaCover.fromJson(cover);
    }
    else if (cover.model === bluecube_name)
    {
        cover = BluecubeCover.fromJson(cover);
    }

    console.log(cover);
    return cover;
}

export default function BuildSheet()
{
    const cover = getCover();
    const customer = getCustomer();

    const printPage = () =>
    {
        window.print();
    }

    const saveToDatabase = () =>
    {
        
    }

    useEffect(() => 
    {
        if (cover !== null)
        {
            cover.draw();
        }
    }, [cover]);

    return (
        <div id='page-container'>
            <Topbar>
                <TopbarButton onClick={printPage} tooltip="Print">
                    <span className="material-symbols-outlined">
                        print
                    </span>
                </TopbarButton>

                <TopbarButton onClick={saveToDatabase} tooltip="Print">
                    <span className="material-symbols-outlined">
                        save
                    </span>
                </TopbarButton>
            </Topbar>

            <div id='page-content'>
                <div id='paper-wrapper'>
                    <div id='build-sheet-paper'>
                        <div id='build-sheet-header' className='mb-3'>
                            <div><h1>Coverplay</h1><h2>Spa Covers</h2></div>
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
                                        <td>{cover !== null && cover.getInfo()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <div id='build-sheet-cover-drawing-wrapper'>
                            <div id='build-sheet-cover-drawing'>
                                { /*<canvas id='cover-drawing'></canvas> */ }
                            </div>
                        </div>

                        <hr/>

                        <div id='build-sheet-notes-wrapper'>
                            <div id='build-sheet-notes-title'>
                                Notes:
                                </div>  
                            <div id='build-sheet-notes' contentEditable='true'>
                                { /* Editable notes area */ }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}