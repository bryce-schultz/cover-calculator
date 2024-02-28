import 
{ 
    customer_table
} from "../../constants/tables";

import { query_limit } from "../../constants/limits";

import sendAsync from './renderer';

export default function getCustomers(name)
{
    const query = 
    'SELECT * FROM ' +
    customer_table +
    " WHERE first_name || ' ' || last_name LIKE ('%' || ? || '%') LIMIT ?;";

    let args = [name, query_limit];

    let customers = 
    sendAsync(query, args)
    .then
    (
        (result) => {return result}
    );

    return customers;
}

export async function getCustomersByFirstName(first_name)
{
    const query = 
    'SELECT * FROM ' +
    customer_table +
    " WHERE first_name LIKE ('%' || ? || '%') LIMIT ?;";

    let args = [first_name, query_limit];

    let customers = 
    await sendAsync(query, args)
    .then
    (
        (result) => {return result}
    );

    return customers;
}