import StandardBifoldCover from '../models/standard_bifold_cover.jsx';

export function toCover(object)
{
    switch(object.model)
    {
        case 'Standard Bifold':
            return StandardBifoldCover.fromJson(object);
        default:
            return null;
    }
}