import { getSettings } from '../settings/settings';

export default function units(value)
{
    const units_string = getSettings().units === 'imperial' ? 'in' : 'cm';
    return value + units_string;
}