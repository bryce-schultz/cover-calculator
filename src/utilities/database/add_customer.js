import 
{ 
    customer_table
} from "../../constants/tables";

import sendAsync from './renderer';

export default async function addCustomer(customer)
{
    if (customer.email === '') 
    {
        customer.first_name = 'Anonymous';
        customer.last_name = '';
        customer.address = '';
        customer.city = '';
        customer.state = '';
        customer.zipcode = '';
        customer.email = '@anyone';
    }

    if (await customerExists(customer))
    {
        return updateCustomer(customer);
    }
    else 
    {
        return insertCustomer(customer);
    }
}

function updateCustomer(customer)
{
    const query = 
    'UPDATE ' + 
    customer_table + 
    ' SET first_name = ?, last_name = ?, address = ?, city = ?, state = ?, zipcode = ? WHERE email = ?;';

    const args = 
    [
        customer.first_name,
        customer.last_name,
        customer.address,
        customer.city,
        customer.state,
        customer.zipcode,
        customer.email
    ];

    let result = 
    sendAsync(query, args)
    .then
    (
        (result) => {return result}
    );

    return result;
}

function insertCustomer(customer)
{
    const query = 
    'INSERT INTO ' + 
    customer_table + 
    '(first_name, last_name, email, address, city, state, zipcode) VALUES (?, ?, ?, ?, ?, ?, ?);';

    const args = 
    [
        customer.first_name,
        customer.last_name,
        customer.email,
        customer.address,
        customer.city,
        customer.state,
        customer.zipcode
    ];

    let result = 
    sendAsync(query, args)
    .then
    (
        (result) => {return result}
    );

    return result;
}

async function customerExists(customer)
{
    const query =
    'SELECT count(id) FROM ' +
    customer_table + 
    ' WHERE email = ?;';

    const args = 
    [
        customer.email
    ];

    let result =
    await sendAsync(query, args)
    .then
    (
        (result) => {return result}
    );

    const key = 'count(id)';

    return (result[0][key] === 0 ? false : true);
}

export function getCustomerID(customer)
{
    const query =
    'SELECT id FROM ' +
    customer_table +
    ' WHERE email = ?;';

    const args =
    [
        customer.email
    ];

    let result =
    sendAsync(query, args)
    .then
    (
        (result) => {return result}
    );

    const key = 'id';
    return result[0][key];
}

