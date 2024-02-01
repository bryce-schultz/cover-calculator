import { React } from "react";
import './covers.css';

export class BuildSheet
{
}

export class Customer
{
    constructor(first_name, 
                last_name, 
                email, 
                address,
                city, 
                state, 
                zipcode)
    {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
    }

    getInfo()
    {
        return (
                <div className="customer-info">
                    {
                        this.first_name !== "" && 
                        <>
                            <div>{this.first_name} {this.last_name}</div>
                            <div>{this.address}</div>
                            <div>{this.city}, {this.state} {this.zipcode}</div>
                            <div>{this.email}</div>
                        </>
                    }
                </div>
        );
    }

    static fromJson(customer)
    {
        return new Customer(customer.first_name, 
                            customer.last_name, 
                            customer.email, 
                            customer.address,
                            customer.city, 
                            customer.state, 
                            customer.zipcode);
    }
}

export class Cover
{
    constructor(model, color, in_ground)
    {   
        this.model = model;
        this.color = color;
        this.in_ground = in_ground;
        this.purchase_date = new Date();
    }

    static fromJson(cover)
    {
        let result = new Cover(cover.model, cover.color, cover.in_ground);
        result.purchase_date = new Date(cover.purchase_date);
        return result;
    }

    draw()
    {
        return (
            <div id='unimplemented-cover-drawing'>Drawing this cover is not supported yet.</div>
        );
    }
}

export class RectangularCover extends Cover
{
    constructor(model, color, in_ground, width, length, corner_radius)
    {
        super(model, color, in_ground);

        this.width = width;
        this.length = length;
        this.corner_radius = corner_radius;
    }

    static fromJson(cover)
    {
        let result = new RectangularCover(cover.model, cover.color, cover.in_ground, cover.width, cover.length, cover.corner_radius);
        result.purchase_date = new Date(cover.purchase_date);
        return result;
    }
}