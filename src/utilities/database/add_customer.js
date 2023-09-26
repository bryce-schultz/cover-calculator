import 
{ 
    customer_table
} from "../../constants/tables";

import { sendAsync } from './renderer';

export default function addCustomer(customer)
{
    insertCustomer(customer, db);
}

function insertCustomer(customer)
{
    const query = 
    'INSERT INTO ' + 
    customer_table + 
    '(first_name, last_name, email, address, city, state, zipcode) VALUES (`?`, `?`, `?`, `?`, `?`, `?`, `?`);';

    const args = 
    [
        customer.first_name,
        customer.last_name,
        customer.email,
        customer.address,
        customer.city,
        customer.state,
        customer.zip
    ];

    let result = 
    sendAsync(query, args)
    .then
    (
        (result) => {return result}
    );

    console.log(result);
}

export function getCustomerID(customer)
{
    
}

