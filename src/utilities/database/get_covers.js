import 
{ 
    cover_table
} from "../../constants/tables";

import sendAsync from '../../utilities/database/renderer';

export default async function getCovers(customer_id)
{
    const query = 
    'SELECT * FROM ' +
    cover_table +
    ' WHERE customer_id = ?;';
    
    const args = [customer_id];

    let covers = await
    sendAsync(query, args)
    .then
    (
        (result) => 
        {
            return result;
        }
    );

    return covers;
}