export function save(key, object)
{
    sessionStorage.setItem(key, JSON.stringify(object));
}

export function retrieve(key)
{
    return JSON.parse(sessionStorage.getItem(key));
}

export function remove(key)
{
    sessionStorage.removeItem(key);
}

export function saveLocal(key, object)
{
    localStorage.setItem(key, JSON.stringify(object));
}

export function retrieveLocal(key)
{
    return JSON.parse(localStorage.getItem(key));
}

export function removeLocal(key)
{
    localStorage.removeItem(key);
}
