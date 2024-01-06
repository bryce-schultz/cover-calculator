import { settings } from '../settings/settings';

export default function units(value)
{
    const units_string = settings.units === 'imperial' ? 'in' : 'cm';
    return value + units_string;
}