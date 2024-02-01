import { retrieveLocal, saveLocal } from '../storage';

const defaultSettings = 
{
    units: 'imperial',
    precision: 2,
};

export const getSettings = () =>
{
    let settings = retrieveLocal('settings');

    if (settings === null)
    {
        settings = defaultSettings;
    }

    console.log(settings);
    return settings;
}