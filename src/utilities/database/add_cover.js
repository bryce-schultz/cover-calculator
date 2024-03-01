import 
{ 
    cover_table
} from "../../constants/tables";

import { formatDate } from '../formatters/format_date';

import { getCustomerId } from './add_customer';

import sendAsync from './renderer';

export async function addCover(customer, cover)
{
    const id = await getCustomerId(customer);
    return await insertCover(id, cover);
}

function insertCover(id, cover)
{
    const query = 
    'INSERT INTO ' + 
    cover_table + 
    '(customer_id, purchase_date, type, model, length, width, corner_radius, panel_count, radius, size_difference, color, airs, in_ground) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';

    const args = 
    [
        id,
        formatDate(cover.purchase_date),
        0,
        cover.model,
        cover.length,
        cover.width,
        cover.corner_radius,
        cover.panel_count,
        cover.radius,
        cover.size_difference,
        cover.color,
        cover.airs,
        cover.in_ground
    ];

    let result = 
    sendAsync(query, args)
    .then
    (
        (result) => {return result}
    );

    return result;
}

export async function deleteCoverById(id)
{
    const query = 'DELETE FROM ' + 
    cover_table + 
    ' WHERE id = ?;';

    const args = [id];

    let result = 
    await sendAsync(query, args)
    .then
    (
        (result) => {return result}
    );

    return result;
}