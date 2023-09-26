export default class Customer
{
    id;
    first_name;
    last_name;
    email;
    address;
    city;
    state;
    zipcode;

    covers;

    constructor(
    {
        id,
        first_name, 
        last_name, 
        email, 
        address, 
        city, 
        state, 
        zipcode
    })
    {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;

        this.covers = [];
    }

    addCover(cover)
    {
        this.covers.push(cover);
    }
}