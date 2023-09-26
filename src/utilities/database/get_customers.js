import 
{ 
    customer_table
} from "../../constants/tables";

import sendAsync from './renderer';

export default function getCustomers(name)
{
    const query = 
    'SELECT * FROM ' +
    customer_table +
    " WHERE first_name || ' ' || last_name LIKE ('%' || ? || '%');";

    let args = [name];

    let customers = 
    sendAsync(query, args)
    .then
    (
        (result) => {return result}
    );

    return customers;
}