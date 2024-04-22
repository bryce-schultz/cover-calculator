import 
{ 
    customer_table
} from "../../constants/tables";

import sendAsync from './ipc';

//***********************************************
// addCustomer
//
// Adds a customer to the database.
// If the customer already exists, update the customer.
// Customer is identified by email.
//
export async function addCustomer(customer)
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

//***********************************************
// updateCustomer
//
// Update the customer in the database.
//
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
    .then(
        (result) => {return result}
    )
    .catch(
        (error) => {console.error(error)}
    );

    return result;
}

//***********************************************
// insertCustomer
//
// Insert the customer into the database.
//
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
    .then(
        (result) => {return result}
    )
    .catch(
        (error) => {console.error(error)}
    );

    return result;
}

//***********************************************
// customerExists
//
// Check if the customer exists in the database.
//
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
    .then(
        (result) => {return result}
    )
    .catch(
        (error) => {console.error(error)}
    );

    const key = 'count(id)';

    return (result[0][key] === 0 ? false : true);
}

//***********************************************
// getCustomerId
//
// Get the customer id from the database.
//
export async function getCustomerId(customer)
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
    await sendAsync(query, args)
    .then(
        (result) => {return result}
    )
    .catch(
        (error) => {console.error(error)}
    );

    const key = 'id';
    if (result[0] === undefined) return null;
    return result[0][key];
}

