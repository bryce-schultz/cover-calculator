export function save(key, object)
{
    sessionStorage.setItem(key, JSON.stringify(object));
}

export function retrieve(key)
{
    return JSON.parse(sessionStorage.getItem(key));
}