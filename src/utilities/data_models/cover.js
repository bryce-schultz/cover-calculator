export default class Cover
{
    constructor
    ({
        id,
        customer_id,
        purchase_date,
        type,
        model,
        length,
        width,
        corner_radius,
        radius,
        size_difference,
        color,
        airs, 
        in_ground
    }
    )
    {
        this.id = id;
        this.customer_id = customer_id;
        this.purchase_date = purchase_date;
        this.type = type;
        this.model = model;
        this.length = length;
        this.width = width;
        this.corner_radius = corner_radius;
        this.radius = radius;
        this.size_difference = size_difference;
        this.color = color;
        this.airs = airs;
        this.in_ground = in_ground;
    }

    addCover(cover)
    {
        this.covers.push(cover);
    }
}

export function FormattedCoverInfo({cover})
{
    if (cover.type === 'standard')
    {
        return (
            <div className='flex-row sizing-info'>
                <div className='length-wrapper margin-right-10'>
                   <span>Length: { cover.length }</span>
                </div>

                <div className='width-wrapper margin-right-10'>
                   <span>Width: { cover.width }</span>
                </div>

                <div className='corner-radius-wrapper'>
                   <span>Cornder Radius: { cover.corner_radius }</span>
                </div>
            </div>
        );
    }
}