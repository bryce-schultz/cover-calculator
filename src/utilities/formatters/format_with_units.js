import { getSettings } from '../settings/settings';

export default function units(value)
{
    const units_string = getSettings().units === 'imperial' ? '"' : 'cm';
    value = value.toFixed(getSettings().precision);
    return value + units_string;
}